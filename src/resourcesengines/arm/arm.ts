import { resourcesEngine } from "../interfaces";
import { AVIresource } from "../../interfaces";
import { call, select } from "redux-saga/effects";
import "isomorphic-fetch";

const getAccessToken = (state: any) => state.user.accessToken;

export class armEngine extends resourcesEngine {
  public static *GetResources(
    resources: AVIresource[]
  ): Generator<any, AVIresource[], any> {
    let ResourceGroupList = new Set<any>();
    var returnElements = [];

    for (let resource of resources) {
      // We want to pick only resources
      // ! Should pick only Existing Microsoft resources -> not done yet
      if (
        resource.type !== "microsoft.resources/subscriptions" &&
        resource.type !== "ManagementGroup" &&
        resource.type !== "microsoft.resources/subscriptions/resourcegroups"
      ) {
        //We add their resource group to the list
        ResourceGroupList.add(resource.enrichments["ARG"].parent);
      }
    }
    for (var resourceGroup of ResourceGroupList) {
      var resourceGroupARM = yield call(
        this.azGetARMResourceGroup,
        resourceGroup
      );

      for (let resource of resources) {
        // We want to add ARM  only to resources
        if (
          resource.type !== "microsoft.resources/subscriptions" &&
          resource.type !== "ManagementGroup" &&
          resource.type !==
            "microsoft.resources/subscriptions/resourcegroups" &&
          resource.enrichments["ARM"] === undefined
        ) {
          for (var resourcetemplate of resourceGroupARM.template.resources) {
            //if it is same resource we add template to resource
            console.info("resourcetemplate", resourcetemplate);
            if (
              resourcetemplate.name === resource.name &&
              resourcetemplate.type.toLowerCase() === resource.type
            ) {
              resource.enrichments.ARM = resourcetemplate;
              break;
            }
          }
        }
        returnElements.push(resource);
      }
    }
    return returnElements;
  }

  static *azGetARMResourceGroup(
    subscriptionIdWithresourceGroupName: string
  ): Generator<any, any, any> {
    //https://docs.microsoft.com/fr-fr/rest/api/resources/resource-groups/export-template
    //POST https://management.azure.com/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/exportTemplate?api-version=2021-04-01
    const accessToken = yield select(getAccessToken);
    const bearerToken = "Bearer " + accessToken;
    const url =
      "https://management.azure.com/" +
      subscriptionIdWithresourceGroupName +
      "/exportTemplate?api-version=2021-04-01";
    const options = {
      method: "POST",
      headers: new Headers({
        Authorization: bearerToken,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        resources: ["*"],
        options: "SkipAllParameterization,IncludeComments",
      }),
    };
    const response = yield call(fetch, url, options);
    const data = yield call([response, response.json]);
    console.info("data", data);
    return data;
  }
}
