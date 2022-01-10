import { createSlice, createSelector } from "@reduxjs/toolkit";

const armEngineSlice = createSlice({
  name: "armEngine",
  initialState: [],
  reducers: {
    addResourceGroupTemplates(state, action) {
      return [...state, action.payload];
    },
  },
});

export const getArmEngineResourceGroupTemplates = (state) => state.armEngine;

export const getArmEngineResourceGroupTemplate = (state, id) => {
  if (state.armEngine === undefined) {
    return undefined;
  } else {
    const result = state.armEngine.find(
      (item) => item.subscriptionIdWithresourceGroupName === id
    );
    if (result === undefined) {
      return undefined;
    } else {
      return result.data.template;
    }
  }
};

export const { addResourceGroupTemplates } = armEngineSlice.actions;

export default armEngineSlice.reducer;
