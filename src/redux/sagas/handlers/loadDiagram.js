import { call, put } from "redux-saga/effects";
import { setDiagram } from "../../ducks/diagramSlice";
//import { useSelector } from "react-redux";

export function* handleLoadDiagram(action) {
  try {
    const response = yield call(LoadDiagram, action.payload);

    yield put(setDiagram(response));
  } catch (error) {
    console.log(error);
  }
}

function LoadDiagram(payload) {
  //Should load from API to get diagram from Storage Account
  //temp code :
  var diagram;
  if (payload === "EmptyDiagram") {
    diagram = {
      name: "Empty Diagram",
      mode: "ReadOnly",
      armtemplate: null,
      overlay: null,
      settings: null,
      elements: {
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
        edges: [],
      },
    };
  }
  if (payload === "DemoDiagram") {
    diagram = {
      name: "Demo Diagram",
      mode: "ReadOnly",
      armtemplate: null,
      overlay: null,
      settings: null,
      elements: {
        nodes: [
          { data: { id: "vnetA" } },
          { data: { id: "subnetA", parent: "vnetA" } },
          { data: { id: "subnetB", parent: "vnetA" } },
          { data: { id: "subnetC", parent: "vnetA" } },
          {
            data: {
              id: "A1",
              parent: "subnetA",
              img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
            },
          },
          {
            data: {
              id: "A2",
              parent: "subnetA",
              img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
            },
          },
          {
            data: {
              id: "A3",
              parent: "subnetA",
              img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
            },
          },

          {
            data: {
              id: "B1",
              parent: "subnetB",
              img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
            },
          },
          {
            data: {
              id: "B2",
              parent: "subnetB",
              img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
            },
          },
          {
            data: {
              id: "B3",
              parent: "subnetB",
              img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
            },
          },
        ],
        edges: [
          { data: { id: "A1A2", source: "A1", target: "A2" } },
          { data: { id: "A1A3", source: "A1", target: "A3" } },

          { data: { id: "B1B2", source: "B1", target: "B2" } },
          { data: { id: "B1B3", source: "B1", target: "B3" } },

          { data: { id: "A2B1", source: "A2", target: "B1" } },
          { data: { id: "A3B1", source: "A3", target: "B1" } },
        ],
      },
    };
  }
  return diagram;
}
