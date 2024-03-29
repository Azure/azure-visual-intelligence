import { call, put, select, all } from "redux-saga/effects";
import {
  setDiagramNodes,
  getDiagramResources,
  getDiagramResource,
} from "../../ducks/diagramSlice";

export const getDiagramRelations = (state) => state.diagram.relations;
export const getAzureSettings = (state) => state.settings;
export const getCurrentLayout = (state) => state.settings.diagram.CurrentLayout;

export function* handleNewDiagramResources(action) {
  try {
    const currentDiagramResources = yield select(getDiagramResources);
    const azureSettings = yield select(getAzureSettings);
    const currentDiagramRelations = yield select(getDiagramRelations);

    const responses = yield all(
      yield azureSettings.layout.map((layout) =>
        call(
          AddDiagramResourceToDisplay,
          currentDiagramResources,
          currentDiagramRelations,
          azureSettings,
          layout.name
        )
      )
    );

    yield all(
      responses.map((response) => {
        return put(setDiagramNodes(response));
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* AddDiagramResourceToDisplay(
  diagramResources,
  diagramRelations,
  azureSettings,
  Evaluatedlayout
) {
  //Resources can only be nodes - not edge.
  //For now we create a fresh new list each time we receive new item(s)
  //This code is executed for all layout
  var returnNodes = [];
  var returnEdges = [];
  for (const resource of diagramResources) {
    //get the azure resource metadata
    var nodeSettings = azureSettings.resources.azure.find(
      (element) => element.type === resource.type
    );

    //if we don't find the resource type we still want a default display
    if (nodeSettings === undefined) {
      nodeSettings = {
        icon: "/assets/img/azure/original/default.svg",
      };
    }

    //get the layout resource metadata
    var layoutSettings = azureSettings.layout
      .find((layout) => layout.name === Evaluatedlayout)
      .items.find((item) => item.type === resource.type.toLowerCase());

    //if we don't find the resource type we still want a default display
    if (layoutSettings === undefined) {
      layoutSettings = azureSettings.layout
        .find((layout) => layout.name === Evaluatedlayout)
        .items.find((item) => item.type === "default");
    }

    if (layoutSettings.diagramprimitive !== "hidden") {
      //parent logic
      let trueparentID = null;
      let trueparent = diagramRelations.find(
        (element) =>
          element.targetID === resource.AVIresourceID &&
          element.sourceType === layoutSettings.parentType
      );

      if (trueparent !== undefined) {
        trueparentID = trueparent.sourceID;
      } else {
        //this is risky, should be improved
        //We are doing it to detect ARM relationship Bastion -> Subnet (that should be Subnet -> Bastion but ARM is ARM)
        trueparent = diagramRelations.find(
          (element) =>
            element.sourceID === resource.AVIresourceID &&
            element.targetType === layoutSettings.parentType
        );
        if (trueparent !== undefined) {
          trueparentID = trueparent.targetID;
        }
      }
      
      var newNode;
      if (layoutSettings.diagramprimitive === "item") {
        if (trueparentID !== undefined) {
          //we build the adequate layout info for the node
          newNode = {
            data: {
              id: resource.AVIresourceID,
              label: resource.name,
              parent: trueparentID,
              img: nodeSettings.icon,
              diagramprimitive: layoutSettings.diagramprimitive,
            },
            classes: "nodeIcon",
          };
        } else {
          newNode = {
            data: {
              id: resource.AVIresourceID,
              label: resource.name,
              img: nodeSettings.icon,
              diagramprimitive: layoutSettings.diagramprimitive,
            },
            classes: "nodeIcon",
          };
        }
        returnNodes.push(newNode);
      }
      if (layoutSettings.diagramprimitive === "box") {
        if (trueparentID !== undefined) {
          newNode = {
            data: {
              id: resource.AVIresourceID,
              label: resource.name,
              parent: trueparentID,
              img: nodeSettings.icon,
              diagramprimitive: layoutSettings.diagramprimitive,
            },
          };
        } else {
          newNode = {
            data: {
              id: resource.AVIresourceID,
              label: resource.name,
              img: nodeSettings.icon,
              diagramprimitive: layoutSettings.diagramprimitive,
            },
          };
        }
        returnNodes.push(newNode);
      }
    }
  }
  //edge
  if (Evaluatedlayout === "ARM") {
    let diagramResources = yield select(getDiagramResources);
    for (let relation of diagramRelations) {
      if (relation.type !== "ARG") {
        if (
          isResourcePartOfDiagram(diagramResources, relation.sourceID) &&
          isResourcePartOfDiagram(diagramResources, relation.targetID)
        ) {
          let newEdge = {
            data: {
              id: relation.AVIrelationID,
              source: relation.sourceID,
              target: relation.targetID,
            },
          };
          returnEdges.push(newEdge);
        } else {
          console.log(
            "Creating relation : source or target does not exist :",
            relation
          );
        }
      }
    }
  }

  //HERE lets add alignement constraint
  
  return { Evaluatedlayout, returnNodes, returnEdges };
}

function isResourcePartOfDiagram(diagramResources, AVIID) {
  //const template = yield select(getDiagramResource, AVIID);
  const result = diagramResources.find((item) => item.AVIresourceID === AVIID);
  if (result !== undefined) {
    return true;
  } else {
    return false;
  }
}
