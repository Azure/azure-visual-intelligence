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
//    [getArmEngineResourceGroupTemplates, (id) => id],
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

/*export const getArmEngineResourceGroupTemplate = (state, id) => {
  console.log("id", id);
  createSelector(
    [
      // Usual first input - extract value from `state`
      (state) => state.armEngine,
      // Take the second arg, `category`, and forward to the output selector
      (state, id) => id,
    ],
    (templates, id) => {
      console.log("id", id);
      if (templates === undefined) {
        return undefined;
      } else {
        return templates.find(
          (item) => item.subscriptionIdWithresourceGroupName === id
        );
      }
    }
  );
};*/

export const { addResourceGroupTemplates } = armEngineSlice.actions;

export default armEngineSlice.reducer;
