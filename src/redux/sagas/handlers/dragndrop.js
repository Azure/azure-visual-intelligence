import { call, put } from "redux-saga/effects";
import { setDiagram } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export function* handleDragnDrop(action) {
  try {
    const response = yield call(AddResourceToDiagram, {
      ...action.payload,
    });

    yield put(setDiagram(response));
  } catch (error) {
    console.log(error);
  }
}

function AddResourceToDiagram(payload) {
  //get current diagram state
  //const currentDiagram = useSelector((state) => state.diagram.elements);

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
