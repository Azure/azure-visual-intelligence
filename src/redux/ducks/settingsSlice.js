import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagram: {
    DisplayInstanceName: false,
    DisplayInstanceType: false,
    AlwaysAskDragnDropSubGovernanceResources: false,
    DragnDropSubGovernanceResources: true,
    AlwaysAskDragnDropSubARMResources: false,
    DragnDropSubARMResources: true,
    DefaultLayout: "ARM",
    CurrentLayout: "ARM",
  },
  resources: {
    azure: [],
  },
  layout: [],
  overlay: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettings() {},
    setSettings(state, action) {
      return {...action.payload};
    },
    setCurrentLayout(state, action) {
      return {
        ...state,
        diagram: {
          ...state.diagram,
          CurrentLayout: action.payload,
        },
      };
    },
  },
});

export const { getSettings, setSettings, setCurrentLayout } =
  settingsSlice.actions;

export default settingsSlice.reducer;
