import { resourcesEngine } from "../interfaces";
import { AVIresource, AVIrelation } from "../../interfaces";
import {
  addResourceGroupTemplates,
  getArmEngineResourceGroupTemplate,
} from "../../redux/ducks/armEngineSlice";
import { getDiagramResource } from "../../redux/ducks/diagramSlice";
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
  ): Generator<any, [AVIresource[], AVIrelation[]], any> {
    //Exclude already enriched ARM resources
    var [resourcesToEnrich, resourcesAlreadyEnriched] =
      armEngine.GetResourcesToEnrich(resources);

    //Get compliant Resource Group ID for ARM API for the resources to enrich
    const ARMresourceGroupsID = armEngine.GetResourceGroups(resourcesToEnrich);

    var returnElements = [];
    var returnEdges: AVIrelation[] = [];

    //Resources already enriched are part of the response as is
    for (const resource of resourcesAlreadyEnriched) {
      returnElements.push(resource);
    }

    //For each resource group
    for (const resourceGroupID of ARMresourceGroupsID) {
      //get the ARM template
      var resourcegroupARMtemplate = yield call(
        armEngine.azGetARMResourceGroup,
        resourceGroupID
      );

      //Enrich the resources in the parameters not yet enriched
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

      for (let resource of resourcegroupARMtemplate.resources) {
        //let's be bold and add ID relation, assuming required subtype will be added later anyway :p
        const IDrelations: AVIrelation[] = armEngine.GenerateAVIARMIDRelations(
          resourceGroupID,
          resource
        );
        for (var IDrelation of IDrelations) {
          returnEdges.push(IDrelation);
        }

        //ADD and Enrich subtype related to resources part of the parameters
        //ADD the relation between main type and subtype
        if (armEngine.isSubType(resource)) {
          const mainResourceId: string = armEngine.GetMainResourceAVIID(
            resourceGroupID,
            resource
          );
          if (armEngine.isResourcePartOfList(returnElements, mainResourceId)) {
            // yield armEngine.isResourcePartOfDiagram(mainResourceId) ||
            const AVIresource: AVIresource =
              armEngine.GenerateAVIResourceFromTemplate(
                resourceGroupID,
                resource
              );
            returnElements.push(AVIresource);
            returnEdges.push(
              armEngine.GenerateAVIARMSubTypeRelation(
                mainResourceId,
                AVIresource.AVIresourceID
              )
            );
          } else {
            console.log(
              "sub type not added because main type not in diagram",
              resource
            );
          }
        } else {
          console.log(
            "This is not a subtype, we should add other relations",
            resource
          );
        }
      }
    }

    return [returnElements, returnEdges];
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

  static isSubType(resource: any) {
    if (resource.type.split("/").length - 1 > 1) {
      return true;
    } else {
      return false;
    }
  }
  static GenerateAVIARMSubTypeRelation(sourceID: string, targetID: string) {
    let AVIrelation: AVIrelation = {
      AVIrelationID: sourceID + targetID,
      sourceID: sourceID,
      targetID: targetID,
      type: "SubType",
    };
    return AVIrelation;
  }

  static getDeepKeys(obj: any) {
    var keys = [];
    for (var key in obj) {
      if (key === "id") {
        keys.push(obj[key]);
      }
      if (typeof obj[key] === "object") {
        var subkeys: any = armEngine.getDeepKeys(obj[key]);
        keys = keys.concat(
          subkeys.map(function (subkey: any) {
            return subkey;
          })
        );
      }
    }
    return keys;
  }
  static GenerateAVIARMIDRelations(
    resourceGroupID: string,
    resourceTemplate: any
  ) {
    let returnRelations: AVIrelation[] = [];
    if (armEngine.isSubType(resourceTemplate)) {
      const AVIresourceID =
        resourceGroupID.toLowerCase() +
        "/providers/" +
        resourceTemplate.type.split("/")[0].toLowerCase() +
        "/" +
        resourceTemplate.type.split("/")[1].toLowerCase() +
        "/" +
        resourceTemplate.name.split("/")[0].toLowerCase() +
        "/" +
        resourceTemplate.type.split("/")[2].toLowerCase() +
        "/" +
        resourceTemplate.name.split("/")[1].toLowerCase();
      let IDrelations = armEngine.getDeepKeys(resourceTemplate);
      for (let IDtarget of IDrelations) {
        if (IDtarget.startsWith("[resourceId")) {
          const regex = new RegExp(
            "\\[resourceId\\(\\'(?<resourcetype>.*?)\\',\\s\\'(?<resourcename>.*?)\\'"
          );
          const result = regex.exec(IDtarget);
          if (result !== undefined && result !== null) {
            if (result.groups !== undefined) {
              const target =
                resourceGroupID.toLowerCase() +
                "/providers/" +
                result.groups.resourcetype.toLowerCase() +
                "/" +
                result.groups.resourcename.toLowerCase();
              if (IDtarget !== AVIresourceID) {
                let AVIrelation: AVIrelation = {
                  AVIrelationID: AVIresourceID + IDtarget,
                  sourceID: AVIresourceID,
                  targetID: target,
                  type: "ref",
                };
                returnRelations.push(AVIrelation);
              }
            }
          }
        }
      }
    } else {
      const AVIresourceID =
        resourceGroupID.toLowerCase() +
        "/providers/" +
        resourceTemplate.type.split("/")[0].toLowerCase() +
        "/" +
        resourceTemplate.type.split("/")[1].toLowerCase() +
        "/" +
        resourceTemplate.name.split("/")[0].toLowerCase();
      let IDrelations = armEngine.getDeepKeys(resourceTemplate);
      for (let IDtarget of IDrelations) {
        if (IDtarget.startsWith("[resourceId")) {
          const regex = new RegExp(
            "\\[resourceId\\(\\'(?<resourcetype>.*?)\\',\\s\\'(?<resourcename>.*?)\\'"
          );
          const result = regex.exec(IDtarget);
          if (result !== undefined && result !== null) {
            if (result.groups !== undefined) {
              const target =
                resourceGroupID.toLowerCase() +
                "/providers/" +
                result.groups.resourcetype.toLowerCase() +
                "/" +
                result.groups.resourcename.toLowerCase();
              if (IDtarget !== AVIresourceID) {
                let AVIrelation: AVIrelation = {
                  AVIrelationID: AVIresourceID + IDtarget,
                  sourceID: AVIresourceID,
                  targetID: target,
                  type: "ref",
                };
                returnRelations.push(AVIrelation);
              }
            }
          }
        }
      }
    }

    return returnRelations;
  }

  static GenerateAVIResourceFromTemplate(
    resourceGroupID: string,
    resourceTemplate: any
  ) {
    let AVIresource: AVIresource = {
      AVIresourceID:
        resourceGroupID.toLowerCase() +
        "/providers/" +
        resourceTemplate.type.split("/")[0].toLowerCase() +
        "/" +
        resourceTemplate.type.split("/")[1].toLowerCase() +
        "/" +
        resourceTemplate.name.split("/")[0].toLowerCase() +
        "/" +
        resourceTemplate.type.split("/")[2].toLowerCase() +
        "/" +
        resourceTemplate.name.split("/")[1].toLowerCase(),
      resourcegroup: resourceGroupID.substring(67),
      subscription: resourceGroupID.substring(15, 51),
      type: resourceTemplate.type.toLowerCase(),
      name: resourceTemplate.name,
      enrichments: {
        ARG: {
          parent:
            "/subscriptions/" +
            resourceGroupID.substring(15, 51) +
            "/resourcegroups/" +
            resourceGroupID.substring(67),
        },
        ARM: resourceTemplate,
      },
    };
    return AVIresource;
  }

  static isResourcePartOfList(list: AVIresource[], AVIID: string) {
    const result = list.find((item) => item.AVIresourceID === AVIID);
    if (result === undefined) {
      return false;
    } else {
      return true;
    }
  }

  static *isResourcePartOfDiagram(AVIID: string): Generator<any, any, any> {
    const template = yield select(getDiagramResource, AVIID);
    if (template !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  static GetMainResourceAVIID(resourceGroupID: string, resourcetemplate: any) {
    const MainResourceAVIID: string =
      resourceGroupID +
      "/providers/" +
      resourcetemplate.type.split("/")[0].toLowerCase() +
      "/" +
      resourcetemplate.type.split("/")[1].toLowerCase() +
      "/" +
      resourcetemplate.name.split("/")[0].toLowerCase();
    return MainResourceAVIID;
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
