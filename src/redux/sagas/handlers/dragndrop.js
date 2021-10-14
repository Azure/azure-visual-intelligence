import { call, put, select } from "redux-saga/effects";
import { setDiagramElements } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export const getDiagram = (state) => state.diagram.elements;
export const getAzureSettings = (state) => state.settings;
export const getCurrentLayout = (state) => state.settings.diagram.CurrentLayout;

export function* handleDragnDrop(action) {
  try {
    // query the state using the exported selector

    const currentDiagram = yield select(getDiagram);
    const azureSettings = yield select(getAzureSettings);
    const currentLayout = yield select(getCurrentLayout);

    const response = yield call(
      AddResourceToDiagram,
      action.payload,
      currentDiagram,
      azureSettings,
      currentLayout
    );

    yield put(setDiagramElements(response));
  } catch (error) {
    console.log(error);
  }
}

function AddResourceToDiagram(payload, diagram, azureSettings, currentLayout) {
  // ! node is not duplicate in Cytoscape but it is in redux, need to fix that

  // Get the settings for the node to add. ( ! This suppose only one node is selected within the toolbox treeview)
  switch (currentLayout) {
    case "Governance":
      var nodes = diagram.nodes;
      var edges = diagram.edges;
      if (!Array.isArray(payload)) {
        //get the azure resource metadata
        var nodeSettings = azureSettings.resources.azure.find(
          (element) => element.type === payload.type
        );

        //get the layout resource metadata
        var layoutSettings = azureSettings.layout
          .find((element) => element.name === "Governance")
          .hierarchy.find((element) => element.type === payload.type);

        //if we don't find the resource type we still want a default display
        if (nodeSettings === undefined) {
          nodeSettings = {
            icon: "/assets/img/azure/original/default.svg",
            diagramprimitive: "item",
          };
        }

        if (layoutSettings === undefined) {
          layoutSettings = azureSettings.layout
            .find((element) => element.name === "Governance")
            .hierarchy.find((element) => element.type === "default");
        }

        //if we find the resource type we provide the adequate layout
        var newNodes = [
          {
            data: {
              id: payload.TreeID,
              label: payload.TreeName,
              parentgovernance: payload.TreeParentID,
              img: nodeSettings.icon,
              diagramprimitive: layoutSettings.diagramprimitive,
            },
          },
        ];

        //we construct the nodes list from old nodes + new ones
        nodes = [...nodes, ...newNodes];
      } else {
        payload.forEach((nodeToAdd) => {
          var nodeSettings = azureSettings.resources.azure.find(
            (element) => element.type === nodeToAdd.type
          );

          //get the layout resource metadata
          var layoutSettings = azureSettings.layout
            .find((element) => element.name === "Governance")
            .hierarchy.find((element) => element.type === nodeToAdd.type);

          //if we don't find the resource type we still want a default display
          if (nodeSettings === undefined) {
            nodeSettings = {
              icon: "/assets/img/azure/original/default.svg",
              diagramprimitive: "item",
            };
          }

          if (layoutSettings === undefined) {
            layoutSettings = azureSettings.layout
              .find((element) => element.name === "Governance")
              .hierarchy.find((element) => element.type === "default");
          }

          //if we find the resource type we provide the adequate layout
          var newNodes = [
            {
              data: {
                id: nodeToAdd.TreeID,
                label: nodeToAdd.TreeName,
                parentgovernance: nodeToAdd.TreeParentID,
                img: nodeSettings.icon,
                diagramprimitive: layoutSettings.diagramprimitive,
              },
            },
          ];
          console.log(newNodes);
          //we construct the nodes list from old nodes + new ones
          nodes = [...nodes, ...newNodes];
        });
      }
      //we update parent relation ship to ALL nodes (relation of some old node may have change with this new node)
      nodes.forEach(function (node, index) {
        var ParentNode = nodes.find(
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
      }, nodes);
      //we save the new elements list
      var returnElements = { nodes, edges };

      break;

    case "Network":
      break;
    default:
      break;
  }
  return returnElements;
}
