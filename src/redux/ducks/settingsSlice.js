import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagram: {
    DisplayInstanceName: false,
    DisplayInstanceType: false,
    AlwaysAskDragnDropSubGovernanceResources: false,
    DragnDropSubGovernanceResources: false,
    AlwaysAskDragnDropSubARMResources: false,
    DragnDropSubARMResources: false,
  },
  resources: {
    azure: [
      {
        type: "ManagementGroup",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups.svg",
        diagramprimitive: "box",
      },
      {
        type: "microsoft.resources/subscriptions",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups/subscriptions.svg",
        diagramprimitive: "box",
      },
      {
        type: "microsoft.resources/subscriptions/resourcegroups",
        icon: "/assets/img/azure/original/microsoft.resources/resourcegroups.svg",
        diagramprimitive: "box",
      },
      {
        type: "microsoft.databricks/workspaces",
        icon: "/assets/img/azure/original/microsoft.resources/resourcegroups.svg",
        diagramprimitive: "subitem",
      },
    ],
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettings() {},
    setSettings(state, action) {
      const settingsData = action.payload;
      return [...state, ...settingsData];
    },
  },
});

export const { getResources, setResources } = settingsSlice.actions;

export default settingsSlice.reducer;
