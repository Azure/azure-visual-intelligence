import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Demo Diagram",
  mode: "ReadOnly",
  armtemplate: null,
  overlay: null,
  settings: null,
  elements: {
    nodes: [
      { data: { id: "vnetA", label: "vnetA" } },
      { data: { id: "subnetA", label: "subnetA", parent: "vnetA" } },
      { data: { id: "subnetB", label: "subnetB", parent: "vnetA" } },
      {
        data: {
          id: "A1",
          label: "A1",
          parent: "subnetA",
          img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
        },
      },
      {
        data: {
          id: "A2",
          label: "A2",
          parent: "subnetA",
          img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        },
      },
      {
        data: {
          id: "A3",
          label: "A3",
          parent: "subnetA",
          img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        },
      },

      {
        data: {
          id: "B1",
          label: "B1",
          parent: "subnetB",
          img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
        },
      },
      {
        data: {
          id: "B2",
          label: "B1",
          parent: "subnetB",
          img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        },
      },
      {
        data: {
          id: "B3",
          label: "B3",
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

const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    getDiagram() {},
    setDiagram(state, action) {
      return { ...state, ...action.payload };
    },
    setDiagramElements(state, action) {
      return { ...state, elements: { ...action.payload } };
    },
  },
});
export const { getDiagram, setDiagram, setDiagramElements } =
  diagramSlice.actions;

export default diagramSlice.reducer;
