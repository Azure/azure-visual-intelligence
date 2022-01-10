import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Demo Diagram",
  resources: [],
  relations: [],
  recommendations: [],
  display: {
    Governance: {
      elements: {
        nodes: [],
        edges: [],
      },
    },
    ARM: {
      elements: {
        nodes: [],
        edges: [],
      },
    },
    Network: {
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
    setDiagram(state, action) {
      return { ...state, ...action.payload };
    },
    setDiagramResources(state, action) {
      return { ...state, resources: [...action.payload] };
    },
    setDiagramRelations(state, action) {
      return { ...state, relations: [...action.payload] };
    },
    setDiagramElements(state, action) {
      return { ...state, elements: { ...action.payload } };
    },
    setDiagramNodes(state, action) {
      return {
        ...state,
        display: {
          ...state.display,
          [action.payload.Evaluatedlayout]: {
            ...state.display[action.payload.Evaluatedlayout],
            ["elements"]: {
              ...state.display[action.payload.Evaluatedlayout]["elements)"],
              nodes: action.payload.returnNodes,
              edges: action.payload.returnEdges,
            },
          },
        },
      };
    },
    setDiagramGovernanceNodes(state, action) {
      return {
        ...state,
        display: {
          ...state.display,
          ["Governance"]: {
            ...state.display["Governance"],
            ["elements"]: {
              ...state.display["Governance"]["elements)"],
              nodes: action.payload,
            },
          },
        },
      };
    },
  },
});

export const {
  setDiagram,
  setDiagramElements,
  setDiagramResources,
  setDiagramNodes,
  setDiagramGovernanceNodes,
  setDiagramRelations,
} = diagramSlice.actions;

export default diagramSlice.reducer;
