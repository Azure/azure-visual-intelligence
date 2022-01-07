import { createSlice } from "@reduxjs/toolkit";

const resourcesSlice = createSlice({
  name: "AvailableResources",
  initialState: [],
  reducers: {
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

export const { setResources } = resourcesSlice.actions;
//addResourceRecommandationASC

export default resourcesSlice.reducer;
