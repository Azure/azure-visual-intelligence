import { call, put, select, all } from "redux-saga/effects";
import { setDiagramNodes } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export const getDiagramResources = (state) => state.diagram.resources;
export const getAzureSettings = (state) => state.settings;
export const getCurrentLayout = (state) => state.settings.diagram.CurrentLayout;

export function* handleNewDiagramResources(action) {
  try {
    const currentDiagramResources = yield select(getDiagramResources);
    const azureSettings = yield select(getAzureSettings);

    //Call
    const responses = yield all(
      azureSettings.layout.map((layout) =>
        call(
          AddDiagramResourceToDisplay,
          currentDiagramResources,
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
  azureSettings,
  Evaluatedlayout
) {
  //Resources can only be nodes - not edge.
  //For now we create a fresh new list each time we receive new item(s)
  //This code is executed for all layout
  var returnNodes = [];
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

    //we build the adequate layout info for the node
    var newNode = {
      data: {
        id: resource.TreeID,
        label: resource.TreeName,
        parentgovernance: resource.TreeParentID,
        img: nodeSettings.icon,
        diagramprimitive: layoutSettings.diagramprimitive,
      },
    };
    returnNodes.push(newNode);
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
        };
      }
    }, returnNodes);
  }
  return { Evaluatedlayout, returnNodes };
}
