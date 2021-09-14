import { call, put, select } from "redux-saga/effects";
import { setDiagram } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export const getDiagram = (state) => state.diagram;

export function* handleDragnDrop(action) {
  try {
    // query the state using the exported selector
    const currentDiagram = yield select(getDiagram);

    const response = yield call(AddResourceToDiagram, {
      // change parameters : diagram + ressrouces to add + setting
      ...action.payload,
    });

    yield put(setDiagram(response));
  } catch (error) {
    console.log(error);
  }
}

function AddResourceToDiagram(payload) {
  //Final process
  //new parameters : diagram + resources to add + settings

  //GET setting display for the resource
  //GET ARM of resources to add
  // look for dependencies
  // are dependencies currently in the diagram ? create diagram edge

  //generate return

  //temporary process to makes things easy
  // each item should be added as is to the existing diagram
  const elements = {
    nodes: [
      { data: { id: "vnetA" } },
      { data: { id: "subnetA", parent: "vnetA" } },
      {
        data: {
          id: "A1",
          parent: "subnetA",
          img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
        },
      },
    ],
  };
  return elements;
}
