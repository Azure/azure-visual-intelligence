import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagram: {
    DisplayInstanceName: false,
    DisplayInstanceType: false,
    AlwaysAskDragnDropSubGovernanceResources: false,
    DragnDropSubGovernanceResources: false,
    AlwaysAskDragnDropSubARMResources: false,
    DragnDropSubARMResources: false,
    DefaultLayout: "governance",
    CurrentLayout: "governance",
  },
  resources: {
    azure: [
      {
        type: "ManagementGroup",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups.svg",
      },
      {
        type: "microsoft.resources/subscriptions",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups/subscriptions.svg",
      },
      {
        type: "microsoft.resources/subscriptions/resourcegroups",
        icon: "/assets/img/azure/original/microsoft.resources/resourcegroups.svg",
      },
      {
        type: "microsoft.databricks/workspaces",
        icon: "/assets/img/azure/original/microsoft.databricks/workspaces.svg",
      },
      {
        type: "Microsoft.Network/virtualNetworks/subnets",
        icon: "/assets/img/azure/original/microsoft.network/virtualnetworks/subnets.svg",
      },
      {
        type: "microsoft.compute/virtualmachines",
        icon: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
      },
      {
        type: "microsoft.operationsmanagement/solutions",
        icon: "/assets/img/azure/original/microsoft.operationsmanagement/solutions.svg",
      },
      {
        type: "microsoft.storage/storageaccounts",
        icon: "/assets/img/azure/original/microsoft.storage/storageaccounts.svg",
      },
      {
        type: "microsoft.logic/workflows",
        icon: "/assets/img/azure/original/microsoft.logic/workflows.svg",
      },
      {
        type: "microsoft.web/certificates",
        icon: "/assets/img/azure/original/microsoft.web/certificates.svg",
      },
      {
        type: "microsoft.containerregistry/registries",
        icon: "/assets/img/azure/original/microsoft.containerregistry/registries.svg",
      },
    ],
  },
  layout: [
    {
      name: "governance",
      hierarchy: [
        {
          type: "ManagementGroup",
          diagramprimitive: "box",
        },
        {
          type: "microsoft.resources/subscriptions",
          diagramprimitive: "box",
        },
        {
          type: "microsoft.resources/subscriptions/resourcegroups",
          diagramprimitive: "box",
          parent_type: "microsoft.resources/subscriptions",
        },
        {
          type: "default",
          diagramprimitive: "item",
          parenttype: "microsoft.resources/subscriptions/resourcegroups",
        },
      ],
    },
    {
      name: "network",
      hierarchy: [
        {
          type: "microsoft.resources/subscriptions",
          diagramprimitive: "box",
          parent: {
            type: "ManagementGroup",
            connector: "ExistingAzureResources",
            query: "TreeParentID",
          },
        },
        {
          type: "microsoft.resources/subscriptions/resourcegroups",
          diagramprimitive: "subitem",
          parent_type: "microsoft.resources/subscriptions",
        },
        {
          type: "defaut",
          diagramprimitive: "item",
        },
      ],
    },
  ],
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
