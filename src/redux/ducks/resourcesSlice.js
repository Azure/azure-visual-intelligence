import { createSlice } from "@reduxjs/toolkit";

const resourcesSlice = createSlice({
  name: "AvailableResources",
  initialState: [],
  reducers: {
    getResources() {},
    setResources(state, action) {
      const resourcesData = action.payload;
      return [...state, ...resourcesData];
    },
    /*addResourceRecommandationASC(state, action) {
      const index = action.payload.resourceIndex;
      return state.map((resource, i) => {
        if (i !== index) return resource;
        return { ...resource, RecommandationsASC: action.payload.reco };
      });
    },*/
  },
});

export const { getResources, setResources } = resourcesSlice.actions;
//addResourceRecommandationASC

export default resourcesSlice.reducer;
