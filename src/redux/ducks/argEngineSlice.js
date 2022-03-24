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

export const getArmEngineResources = (state) => state.argEngine.resources;
export const getArmEngineRelations = (state) => state.argEngine.relations;

export const { addResources, addRelations } = argEngineSlice.actions;

export default argEngineSlice.reducer;
