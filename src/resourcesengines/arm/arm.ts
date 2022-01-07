import { resourcesEngine } from "../interfaces";
import { AVIresource } from "../../interfaces";
import {
  addResourceGroupTemplates,
  getArmEngineResourceGroupTemplate,
} from "../../redux/ducks/armEngineSlice";
import { getAccessToken } from "../../redux/ducks/userSlice";
import { call, delay, select, put } from "redux-saga/effects";
import "isomorphic-fetch";

export class armEngine extends resourcesEngine {
  public static *GetResources(
    resources: AVIresource[]
  ): Generator<any, AVIresource[], any> {
    //Exclude already enriched ARM resources
    const [resourcesToEnrich, resourcesAlreadyEnriched] =
      armEngine.GetResourcesToEnrich(resources);

    //Get compliant Resource Group ID for ARM API for the resources to enrich
    const ARMresourceGroupsID = armEngine.GetResourceGroups(resourcesToEnrich);

    var returnElements = [];

    //Resources already enriched are part of the response as is
    for (const resource of resourcesAlreadyEnriched) {
      returnElements.push(resource);
    }

    //For each resource group
    for (const resourceGroupID of ARMresourceGroupsID) {
      //Call ARM API to get resource group ARM template
      var resourcegroupARMtemplate = yield call(
        armEngine.azGetARMResourceGroup,
        resourceGroupID
      );

      //Enrich the resource with info from the template
      for (let resource of resourcesToEnrich) {
        var EnrichedResources = armEngine.EnrichResourceFromARM(
          resource,
          resourcegroupARMtemplate
        );
        //Add enrich resources to response
        for (const resource of EnrichedResources) {
          returnElements.push(resource);
        }
      }
    }

    return returnElements;
  }

  public static *GetResourcesAndRelatedResources(
    resources: AVIresource[]
  ): Generator<any, AVIresource[], any> {
    //Enrich existing resources with their ARM properties
    var enrichresources = yield call(armEngine.GetResources, resources);

    //Look up for resources in ARM code that are not par of AVIresources list
    //func do something

    return enrichresources;
  }

  static GetResourcesToEnrich(resources: AVIresource[]) {
    let resourcesToKeep = new Set<AVIresource>();
    let resourcesAlreadyEnriched = new Set<AVIresource>();
    for (let resource of resources) {
      if (
        resource.type !== "microsoft.resources/subscriptions" &&
        resource.type !== "ManagementGroup" &&
        resource.type !== "microsoft.resources/subscriptions/resourcegroups" &&
        resource.enrichments.ARM === undefined //we want to skip resources already enriched
      ) {
        resourcesToKeep.add(resource);
      } else {
        resourcesAlreadyEnriched.add(resource);
      }
    }
    return [resourcesToKeep, resourcesAlreadyEnriched];
  }

  static GetResourceGroups(resources: Set<AVIresource>) {
    let ARMresourceGroupsID = new Set<string>();
    for (let resource of resources) {
      const id =
        "/subscriptions/" +
        resource.subscription +
        "/resourcegroups/" +
        resource.resourcegroup;
      ARMresourceGroupsID.add(id);
    }
    return ARMresourceGroupsID;
  }

  static EnrichResourceFromARM(resource: AVIresource, template: any) {
    var resources: AVIresource[] = [];
    const match = template.resources.find(
      (elem: any) =>
        elem.name === resource.name && elem.type.toLowerCase() === resource.type
    );
    if (match !== undefined) {
      resource.enrichments.ARM = match;
    }
    resources.push(resource);
    return resources;
  }

  static *azGetARMResourceGroup(
    subscriptionIdWithresourceGroupName: string
  ): Generator<any, any, any> {
    //Check if Resource Group Template is already cached
    const template = yield select(
      getArmEngineResourceGroupTemplate,
      subscriptionIdWithresourceGroupName
    );

    if (template !== undefined) {
      return template;
    } else {
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
      var response = yield call(fetch, url, options);

      while (response.status === 202) {
        /*
      example of a 202 header response
      cache-control: no-cache
      content-length: 0
      expires: -1
      location: https://management.azure.com/subscriptions/320c35fb-03ca-42b2-a67d-46a71839aad1/operationresults/eyJqb2JJZCI6IkV4cG9ydFRlbXBsYXRlSm9iLVBPQzo1RkRTQzo1RkNMVVNURVItMjEwRkY1OEM6MkQxRkJGfDczMjU4OTIxNDM4MENDQTUiLCJqb2JMb2NhdGlvbiI6Indlc3RldXJvcGUifQ?api-version=2021-04-01
      pragma: no-cache
      retry-after: 15
      x-ms-correlation-request-id: 210ff58c-1fbf-460d-b17a-8d5a1a86988b
      x-ms-ratelimit-remaining-subscription-reads: 11978
      x-ms-request-id: 210ff58c-1fbf-460d-b17a-8d5a1a86988b
      x-ms-routing-request-id: FRANCECENTRAL:20220103T091005Z:210ff58c-1fbf-460d-b17a-8d5a1a86988b
      */
        var location: string = "";
        for (var pair of response.headers.entries()) {
          if (pair[0] === "location") {
            location = pair[1];
          }
        }
        yield delay(1000);
        const optionsbis = {
          method: "GET",
          headers: new Headers({
            Authorization: bearerToken,
            "Content-Type": "application/json",
          }),
        };
        response = yield call(fetch, location, optionsbis);
      }

      const data = yield call([response, response.json]);
      const state: any = {
        subscriptionIdWithresourceGroupName,
        data,
      };
      yield put(addResourceGroupTemplates(state));
      return data.template;
    }
  }
}
