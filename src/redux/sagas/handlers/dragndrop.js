import { call, put, select } from "redux-saga/effects";
import { setDiagramResources } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export const getDiagramResources = (state) => state.diagram.resources;

export function* handleDragnDrop(action) {
  try {
    const currentDiagramResources = yield select(getDiagramResources);

    const response = yield call(
      AddResourceToDiagram,
      action.payload,
      currentDiagramResources
    );

    yield put(setDiagramResources(response));
  } catch (error) {
    console.log(error);
  }
}

function AddResourceToDiagram(payload, diagramResources) {
  if (!Array.isArray(payload)) {
    //if payload is a unique item we want to make it a list.
    console.log("here");
    payload = [payload];
  }
  var returnElements;
  if (diagramResources.length === 0) {
    //if diagramResources is currently empty, payload becomes the diagram resources
    returnElements = payload;
  } else {
    //if we have existing items we want to add only new ones
    returnElements = [...diagramResources];
    for (const resource of payload) {
      if (!returnElements.find((element) => element.id === resource.id)) {
        returnElements.push(resource);
      }
    }
  }
  return [...returnElements];
}

/*  // ! node is not duplicate in Cytoscape but it is in redux, need to fix that

  // Get the settings for the node to add. ( ! This suppose only one node is selected within the toolbox treeview)
  switch (currentLayout) {
    case "Governance":
      var nodes = diagram.nodes;
      var edges = diagram.edges;
      if (!Array.isArray(payload)) {
        //get the azure resource metadata
        var nodeSettings = azureSettings.resources.azure.find(
          (element) => element.type === payload.type.toLowerCase()
        );

        //get the layout resource metadata
        var layoutSettings = azureSettings.layout
          .find((element) => element.name === "Governance")
          .hierarchy.find(
            (element) => element.type === payload.type.toLowerCase()
          );

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
      */
