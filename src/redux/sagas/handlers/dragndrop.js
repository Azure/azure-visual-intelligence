import { call, put, select } from "redux-saga/effects";
import { setDiagram } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export const getDiagram = (state) => state.diagram;

export function* handleDragnDrop(action) {
  try {
    // query the state using the exported selector
    const currentDiagram = yield select(getDiagram);
    console.log("currentDiagram");
    console.log(currentDiagram);
    const response = yield call(AddResourceToDiagram, {
      ...action.payload,
    });

    yield put(setDiagram(response));
  } catch (error) {
    console.log(error);
  }
}

function AddResourceToDiagram(payload) {
  //temp to be removed
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
