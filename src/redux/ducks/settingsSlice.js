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
          parent: {
            type: "ManagementGroup",
            query: "",
          },
        },
        {
          type: "microsoft.resources/subscriptions/resourcegroups",
          diagramprimitive: "box",
          parent_type: "microsoft.resources/subscriptions",
        },
        {
          type: "default",
          parenttype: "microsoft.resources/subscriptions/resourcegroups",
          diagramprimitive: "item",
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
