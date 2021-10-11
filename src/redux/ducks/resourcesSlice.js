import { createSlice } from "@reduxjs/toolkit";

const resourcesSlice = createSlice({
  name: "resources",
  initialState: [],
  reducers: {
    getResources() {},
    setResources(state, action) {
      const resourcesData = action.payload;
      return [...state, ...resourcesData];
    },
    addResourceRecommandationASC(state, action) {
      console.log(action);
      const index = action.payload.resourceIndex;
      return state.map((resource, i) => {
        if (i !== index) return resource;
        console.log("here");
        return { ...resource, RecommandationsASC: action.payload.reco };
      });
    },
  },
});

export const { getResources, setResources, addResourceRecommandationASC } =
  resourcesSlice.actions;

export default resourcesSlice.reducer;
