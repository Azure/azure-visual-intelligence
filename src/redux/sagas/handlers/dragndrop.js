import { call, put } from "redux-saga/effects";
import { setDiagram } from "../../ducks/diagramSlice";

export function* handleDragnDrop(action) {
  console.log("here");
  try {
    const response = yield call(addResourceToDiagram, {
      ...action.payload,
    });

    console.log(response);

    yield put(setDiagram(response));
  } catch (error) {
    console.log(error);
  }
}

function addResourceToDiagram(payload) {
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
