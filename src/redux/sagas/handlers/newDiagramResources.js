import { call, put, select, all } from "redux-saga/effects";
import { setDiagramNodes } from "../../ducks/diagramSlice";

export const getDiagramResources = (state) => state.diagram.resources;
export const getDiagramRelations = (state) => state.diagram.relations;
export const getAzureSettings = (state) => state.settings;
export const getCurrentLayout = (state) => state.settings.diagram.CurrentLayout;

export function* handleNewDiagramResources(action) {
  try {
    const currentDiagramResources = yield select(getDiagramResources);
    const azureSettings = yield select(getAzureSettings);
    const currentDiagramRelations = yield select(getDiagramRelations);

    //Call
    const responses = yield all(
      azureSettings.layout.map((layout) =>
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

function AddDiagramResourceToDisplay(
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
    //get the layout resource metadata
    var layoutSettings = azureSettings.layout
      .find((layout) => layout.name === Evaluatedlayout)
      .items.find((item) => item.type === resource.type.toLowerCase());

    //if we don't find the resource type we still want a default display
    if (nodeSettings === undefined) {
      nodeSettings = {
        icon: "/assets/img/azure/original/default.svg",
        diagramprimitive: "item",
      };
    }
    if (layoutSettings === undefined) {
      layoutSettings = azureSettings.layout
        .find((layout) => layout.name === Evaluatedlayout)
        .items.find((item) => item.type === "default");
    }

    if (layoutSettings.diagramprimitive !== "hidden") {
      //we build the adequate layout info for the node
      var newNode = {
        data: {
          id: resource.AVIresourceID,
          label: resource.name,
          parentgovernance: resource.enrichments["ARG"].parent,
          img: nodeSettings.icon,
          diagramprimitive: layoutSettings.diagramprimitive,
        },
      };
      returnNodes.push(newNode);
    }

    //To improve, this is only to add classes to existing nodes
    if (Evaluatedlayout === "ARM") {
      //we update parent relation ship to ALL nodes (relation of some old node may have change with this new node)
      returnNodes.forEach(function (node, index) {
        this[index] = {
          data: {
            ...this[index].data,
          },
          classes: "nodeIcon",
        };
      }, returnNodes);
    }
  }
  //edge
  if (Evaluatedlayout === "ARM") {
    for (var relation of diagramRelations) {
      var newEdge = {
        data: {
          id: relation.AVIrelationID,
          source: relation.sourceID,
          target: relation.targetID,
        },
      };
      returnEdges.push(newEdge);
    }
  }

  if (Evaluatedlayout === "Governance") {
    //we update parent relation ship to ALL nodes (relation of some old node may have change with this new node)
    returnNodes.forEach(function (node, index) {
      var ParentNode = returnNodes.find(
        (element) => element.data.id === this[index].data.parentgovernance
      );
      //if undefined then node has no current parent displayed in the diagram.
      //if not undefined then we need to update the parent field within the studied node
      if (ParentNode !== undefined) {
        this[index] = {
          data: {
            ...this[index].data,
            parent: this[index].data.parentgovernance,
          },
          classes: "nodeIcon",
        };
      }
    }, returnNodes);
  }
  return { Evaluatedlayout, returnNodes, returnEdges };
}

/*
POST https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/
my-resource-group/exportTemplate?api-version=2021-04-01*/
