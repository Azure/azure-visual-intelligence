import { createSlice } from "@reduxjs/toolkit";

const resourcesSlice = createSlice({
  name: "AvailableResources",
  initialState: [],
  reducers: {
    setResources(state, action) {
      let newlist = [];
      console.log(action.payload);
      Array.from(action.payload).forEach((element) => {
        console.log(element);
        let newItem = element;
        newItem.parentId = element.enrichments.ARG.parent;
        newlist.push(newItem);
      });
      return [...state, ...newlist];
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

export default resourcesSlice.reducer;
