import { call, put, select } from "redux-saga/effects";
import { setDiagramElements } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export const getDiagram = (state) => state.diagram.elements;
export const getAzureSettings = (state) => state.settings.resources.azure;

export function* handleDragnDrop(action) {
  try {
    // query the state using the exported selector

    const currentDiagram = yield select(getDiagram);
    const azureSettings = yield select(getAzureSettings);

    const response = yield call(
      AddResourceToDiagram,
      {
        ...action.payload,
      },
      currentDiagram,
      azureSettings
    );

    yield put(setDiagramElements(response));
  } catch (error) {
    console.log(error);
  }
}

function AddResourceToDiagram(payload, diagram, azureSettings) {
  //new parameters : diagram + resources to add + settings
  var takeGovernanceChilds = false;
  var takeGovernanceparents = false;

  //getDependenceFromArm(payload.TreeID);

  //GET setting display for the resource
  //GET ARM of resources to add
  // look for dependencies
  // are dependencies currently in the diagram ? create diagram edge

  //node is unique = not duplicate in Cytoscape but it is in redux, need to fix that

  // Get the settings for the node to add. ( ! This suppose only one node is selected within the toolbox treeview)
  var nodeSettings = azureSettings.find(
    (element) => element.type === payload.type
  );
  if (nodeSettings === undefined) {
    nodeSettings = {
      icon: "/assets/img/azure/original/default.svg",
      diagramprimitive: "item",
    };
  }

  var newNodes = [
    {
      data: {
        id: payload.TreeID,
        label: payload.TreeName,
        //          parent: "subnetA",  // no parent for the newly add resources yet
        img: nodeSettings.icon,
      },
    },
  ];
  var nodes = [...diagram.nodes, ...newNodes];

  var edges = [...diagram.edges];

  var returnElements = { nodes, edges };
  return returnElements;
}
