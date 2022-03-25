import { resourcesEngine } from "../interfaces";
import { AVIresource, AVIrelation } from "../../interfaces";
import { getAccessToken } from "../../redux/ducks/userSlice";
import { call, delay, select, put } from "redux-saga/effects";
import { addResources, addRelations } from "../../redux/ducks/argEngineSlice";
import "isomorphic-fetch";

export class argEngine extends resourcesEngine {
  public static *ListResources(): Generator<
    any,
    [AVIresource[], AVIrelation[]],
    any
  > {
    //Get Subscriptions List
    let subscriptions = yield call(argEngine.GetSubscriptions);

    //Get MG, Subscriptions and RG list
    let resourceContainers = yield call(
      argEngine.GetResourceContainers,
      subscriptions
    );

    let [resources, relations] = argEngine.createResources(resourceContainers);

    yield put(addResources(resources));
    yield put(addRelations(relations));
    console.log(resources);
    return [resources, relations];
  }

  public static *GetResourceAndRelatedresources(
    resource: AVIresource
  ): Generator<any, [AVIresource[], AVIrelation[]], any> {
    yield;
    console.log("should get");
    return [[resource], []];
  }

  private static createResources(
    resourceContainers: any
  ): [AVIresource[], AVIrelation[]] {
    //Note : only the management group that have subscriptions will be present
    //This is because we are getting the management group from subscriptions properties

    let resources: AVIresource[] = [];
    let relations: AVIrelation[] = [];

    resourceContainers.data.forEach((resourceContainer: any) => {
      if (resourceContainer.type === "microsoft.resources/subscriptions") {
        //CONTAINERS
        [resources, relations] = argEngine.addManagementGroup(
          resources,
          relations,
          resourceContainer.properties.managementGroupAncestorsChain
        );
        //SUBSCRIPTIONS
        [resources, relations] = argEngine.addSubscriptions(
          resources,
          relations,
          resourceContainer
        );
      }
      //RESOURCE GROUPS
      if (
        resourceContainer.type ===
        "microsoft.resources/subscriptions/resourcegroups"
      ) {
        [resources, relations] = argEngine.addResourceGroups(
          resources,
          relations,
          resourceContainer
        );
      }
    });

    return [resources, relations];
  }

  private static addResourceGroups(
    resources: any,
    relations: any,
    resourcegroup: any
  ) {
    if (
      !resources.some(function (resourceGroupItem: any) {
        return resourceGroupItem.AVIresourceID === resourcegroup.id;
      })
    ) {
      let AVIresource: AVIresource = {
        AVIresourceID: resourcegroup.id,
        resourcegroup: "",
        subscription: "",
        type: resourcegroup.type,
        name: resourcegroup.name,
        enrichments: {
          ARG: {
            parent: "/subscriptions/" + resourcegroup.subscriptionId,
          },
        },
      };
      resources.push(AVIresource);

      let AVIrelation: AVIrelation = {
        AVIrelationID: resourcegroup.subscriptionId + resourcegroup.id,
        sourceID: resourcegroup.subscriptionId,
        targetID: resourcegroup.id,
        type: "ARG",
      };
      relations.push(AVIrelation);
    }

    return [resources, relations];
  }

  private static addSubscriptions(
    resources: any,
    relations: any,
    resourceContainer: any
  ) {
    if (
      !resources.some(function (subscriptionItem: any) {
        return subscriptionItem.AVIresourceID === resourceContainer.id;
      })
    ) {
      let AVIresource: AVIresource = {
        AVIresourceID: resourceContainer.id,
        resourcegroup: "",
        subscription: "",
        type: resourceContainer.type,
        name: resourceContainer.name,
        enrichments: {
          ARG: {
            parent:
              resourceContainer.properties.managementGroupAncestorsChain[0]
                .name,
          },
        },
      };
      resources.push(AVIresource);

      let AVIrelation: AVIrelation = {
        AVIrelationID:
          resourceContainer.properties.managementGroupAncestorsChain[0].name +
          resourceContainer.id,
        sourceID:
          resourceContainer.properties.managementGroupAncestorsChain[0].name,
        targetID: resourceContainer.id,
        type: "ARG",
      };
      relations.push(AVIrelation);
    }

    return [resources, relations];
  }

  private static addManagementGroup(
    resources: any,
    relations: any,
    managementGroupAncestorsChain: any
  ) {
    for (let i = managementGroupAncestorsChain.length - 1; i >= 0; i--) {
      //if the MG does not already exist then add it
      if (
        !resources.some(function (MG: any) {
          return MG.AVIresourceID === managementGroupAncestorsChain[i].name;
        })
      ) {
        let AVIresource: AVIresource = {
          AVIresourceID: managementGroupAncestorsChain[i].name,
          resourcegroup: "",
          subscription: "",
          type: "ManagementGroup",
          name: managementGroupAncestorsChain[i].displayName,
          enrichments: {
            ARG: {
              parent:
                i === managementGroupAncestorsChain.length - 1
                  ? null
                  : managementGroupAncestorsChain[i + 1].name,
            },
          },
        };
        resources.push(AVIresource);

        if (i !== managementGroupAncestorsChain.length - 1) {
          let AVIrelation: AVIrelation = {
            AVIrelationID:
              managementGroupAncestorsChain[i].name +
              managementGroupAncestorsChain[i + 1].name,
            sourceID: managementGroupAncestorsChain[i].name,
            targetID: managementGroupAncestorsChain[i + 1].name,
            type: "ARG",
          };
          relations.push(AVIrelation);
        }
        /*

        TreeParentID:
          i === managementGroupAncestorsChain.length - 1
            ? null
            : managementGroupAncestorsChain[i + 1].name,*/
      }
    }
    return [resources, relations];
  }

  private static *GetSubscriptions(): Generator<any, any[], any> {
    const accessToken = yield select(getAccessToken);
    const bearerToken = "Bearer " + accessToken;
    const url =
      "https://management.azure.com/subscriptions?api-version=2020-01-01";
    const options = {
      method: "get",
      headers: new Headers({
        Authorization: bearerToken,
      }),
    };
    var response = yield call(fetch, url, options);
    const data = yield call([response, response.json]);
    return data.value;
  }

  private static *GetResourceContainers(
    subscriptions: any[]
  ): Generator<any, any[], any> {
    const accessToken = yield select(getAccessToken);
    const bearerToken = "Bearer " + accessToken;
    const url =
      "https://management.azure.com/providers/Microsoft.ResourceGraph/resources?api-version=2019-04-01";
    const test = Array.from(subscriptions);
    const bodySubscriptions = test.map((subscription: any) => {
      return subscription.subscriptionId;
    });
    const body = {
      subscriptions: bodySubscriptions,
      query: "resourcecontainers ",
      options: {
        resultFormat: "objectArray",
      },
    };
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: bearerToken,
      }),
      body: JSON.stringify(body),
    };
    var response = yield call(fetch, url, options);
    const data = yield call([response, response.json]);
    return data;
  }
}
