import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const resourcesSlice = createSlice({
  name: "resources",
  initialState: [],
  reducers: {
    getResources() {},
    setResources(state, action) {
      const resourcesData = action.payload;
      return [...state, ...resourcesData];
    },
  },
});

export const { getResources, setResources } = resourcesSlice.actions;

export default resourcesSlice.reducer;
