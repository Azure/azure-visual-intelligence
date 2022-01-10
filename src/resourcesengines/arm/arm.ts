import { resourcesEngine } from "../interfaces";
import { AVIresource, AVIrelation } from "../../interfaces";
import {
  addResourceGroupTemplates,
  getArmEngineResourceGroupTemplate,
} from "../../redux/ducks/armEngineSlice";
import { getAccessToken } from "../../redux/ducks/userSlice";
import { call, delay, select, put } from "redux-saga/effects";
import "isomorphic-fetch";
import { isNullOrUndefined } from "util";

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
    //Exclude already enriched ARM resources
    var [resourcesToEnrich, resourcesAlreadyEnriched] =
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
      var resourcegroupARMtemplate = yield call(
        armEngine.azGetARMResourceGroup,
        resourceGroupID
      );

      //For each resource of the template
      for (let resource of resourcegroupARMtemplate.resources) {
        if (resource.dependsOn !== undefined) {
          console.log("resource ", resource.name);
          console.log("resource depends On ", resource.dependsOn);
          for (const dependon of resource.dependsOn) {
            console.log("dependon", dependon);
            const regex = new RegExp(
              "\\[resourceId\\(\\'(?<resourcetype>.*?)\\',\\s\\'(?<resourcename>.*?)\\'"
            );
            const result = regex.exec(dependon);
            console.log(result);
            //if there is at least one dependson clause
            if (result !== undefined && result !== null) {
              if (result.groups !== undefined) {
                if (
                  result.groups.resourcetype !== undefined &&
                  result.groups.resourcename !== undefined
                ) {
                  if (
                    // if it is a depends clause on a n item to display
                    resources.find((element) => element.name === resource.name)
                  ) {
                    console.log("I am resource", resource.name);
                    console.log(
                      "depends clause name ",
                      result.groups.resourcename
                    );
                    console.log(
                      "depends clause type ",
                      result.groups.resourcetype
                    );
                  }
                  if (
                    //if the item to display is part of the depends clause
                    resources.find(
                      (element) =>
                        element.name === result!.groups!.resourcename!
                    )
                  ) {
                    console.log(
                      "I am resource in a dependsOn",
                      result.groups.resourcename
                    );
                    console.log("He depends on me name  ", resource.name);
                    console.log("he depends on me type ", resource.type);
                    if (
                      isNullOrUndefined(
                        resources.find(
                          (element) => element.name === resource.name
                        )
                      )
                    ) {
                      //if the ARM resources does not exist we need to add it
                      let AVIresource: AVIresource = {
                        AVIresourceID:
                          "/subscriptions/" +
                          resourceGroupID.substring(15, 51) +
                          "/resourcegroups/" +
                          resourceGroupID.substring(67) +
                          "/providers/" +
                          resource.type.toLowerCase() +
                          resource.name,
                        resourcegroup: resourceGroupID.substring(52),
                        subscription: resourceGroupID.substring(15, 51),
                        type: resource.type.toLowerCase(),
                        name: resource.name,
                        enrichments: {
                          ARG: {
                            parent:
                              "/subscriptions/" +
                              resourceGroupID.substring(15, 51) +
                              "/resourcegroups/" +
                              resourceGroupID.substring(67),
                          },
                          ARM: resource,
                        },
                      };
                      console.log("Aviresource", AVIresource);
                      resourcesToEnrich.add(AVIresource);
                      console.log(resourcesToEnrich);
                    }
                  }
                }
              } else {
                console.log("depends on  regex failed", resource.dependsOn);
              }
            }
          }
        }
      }
    }
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

    return returnElements;
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
      //return cached template
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
