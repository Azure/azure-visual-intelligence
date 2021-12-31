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
      display: {
        Governance: {
          elements: {
            nodes: [
              { data: { id: "vnetA", label: "vnetA" } },
              {
                data: { id: "subnetA", label: "subnetA", parent: "vnetA" },
                classes: "nodeIcon",
              },
              {
                data: {
                  id: "A1",
                  label: "A1",
                  parent: "subnetA",
                  img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
                },
                classes: "nodeIcon",
              },
            ],
            edges: [],
          },
        },
      },
    };
  }
  if (payload === "DemoDiagram") {
    diagram = {
      name: "Demo Diagram",
      display: {
        Governance: {
          elements: {
            nodes: [
              { data: { id: "vnetA", label: "vnetA" } },
              {
                data: { id: "subnetA", label: "subnetA", parent: "vnetA" },
              },
              {
                data: { id: "subnetB", label: "subnetB", parent: "vnetA" },
              },
              {
                data: {
                  id: "A1",
                  label: "A1",
                  parent: "subnetA",
                  img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
                },
                classes: "nodeIcon",
              },
              {
                data: {
                  id: "A2",
                  label: "A2",
                  parent: "subnetA",
                  img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
                },
                classes: "nodeIcon",
              },
              {
                data: {
                  id: "A3",
                  label: "A3",
                  parent: "subnetA",
                  img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
                },
                classes: "nodeIcon",
              },

              {
                data: {
                  id: "B1",
                  label: "B1",
                  parent: "subnetB",
                  img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
                },
                classes: "nodeIcon",
              },
              {
                data: {
                  id: "B2",
                  label: "B2",
                  parent: "subnetB",
                  img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
                },
                classes: "nodeIcon",
              },
              {
                data: {
                  id: "B3",
                  label: "B3",
                  parent: "subnetB",
                  img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
                },
                classes: "nodeIcon",
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
        },
      },
    };
  }
  return diagram;
}
