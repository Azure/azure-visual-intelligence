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
        icon: "/assets/img/azure/original/microsoft.databricks/workspaces.svg",
        diagramprimitive: "item",
      },
      {
        type: "Microsoft.Network/virtualNetworks/subnets",
        icon: "/assets/img/azure/original/microsoft.network/virtualnetworks/subnets.svg",
        diagramprimitive: "box",
      },
      {
        type: "microsoft.compute/virtualmachines",
        icon: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        diagramprimitive: "item",
      },
      {
        type: "microsoft.operationsmanagement/solutions",
        icon: "/assets/img/azure/original/microsoft.operationsmanagement/solutions.svg",
        diagramprimitive: "subitem",
      },
      {
        type: "microsoft.storage/storageaccounts",
        icon: "/assets/img/azure/original/microsoft.storage/storageaccounts.svg",
        diagramprimitive: "item",
      },
      {
        type: "microsoft.logic/workflows",
        icon: "/assets/img/azure/original/microsoft.logic/workflows.svg",
        diagramprimitive: "item",
      },
      {
        type: "microsoft.web/certificates",
        icon: "/assets/img/azure/original/microsoft.web/certificates.svg",
        diagramprimitive: "item",
      },
      {
        type: "microsoft.containerregistry/registries",
        icon: "/assets/img/azure/original/microsoft.containerregistry/registries.svg",
        diagramprimitive: "item",
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

export const { getSettings, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
