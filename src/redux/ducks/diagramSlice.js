import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Demo Diagram",
  mode: "ReadOnly",
  armtemplate: null,
  overlay: null,
  settings: null,
  elements: {
    nodes: [],
    edges: [],
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
