import { createSlice } from "@reduxjs/toolkit";

const argEngineSlice = createSlice({
  name: "argEngine",
  initialState: [],
  reducers: {
    addResources(state, action) {
      return { ...state, resources: [...action.payload] };
    },
    addRelations(state, action) {
      return { ...state, relations: [...action.payload] };
    },
  },
});

export const getArgEngineResources = (state) => state.argEngine.resources;
export const getArgEngineRelations = (state) => state.argEngine.relations;

export const { addResources, addRelations } = argEngineSlice.actions;

export default argEngineSlice.reducer;
