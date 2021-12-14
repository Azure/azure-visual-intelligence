import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Demo Diagram",
  resources: [],
  resourcesrelations: [],
  recommendations: [],
  display: {
    governance: {
      elements: {
        nodes: [],
        edges: [],
      },
    },
    network: {
      elements: {
        nodes: [],
        edges: [],
      },
    },
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
    setDiagramResources(state, action) {
      return { ...state, resources: [...action.payload] };
    },
    setDiagramElements(state, action) {
      return { ...state, elements: { ...action.payload } };
    },
  },
});
export const {
  getDiagram,
  setDiagram,
  setDiagramElements,
  setDiagramResources,
} = diagramSlice.actions;

export default diagramSlice.reducer;
