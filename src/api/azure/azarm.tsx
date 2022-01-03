//this first function needs to handle 202 response

/*cache-control: no-cache
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

export async function azGetARMResourceGroup([
  accessToken,
  subscriptionIdWithresourceGroupName,
]: [string, string]) {
  //https://docs.microsoft.com/fr-fr/rest/api/resources/resource-groups/export-template
  //POST https://management.azure.com/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/exportTemplate?api-version=2021-04-01
  const bearerToken = "Bearer " + accessToken;
  const url =
    "https://management.azure.com/" +
    subscriptionIdWithresourceGroupName +
    "/exportTemplate?api-version=2021-04-01";
  const resourceGroupARM = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: bearerToken,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      resources: ["*"],
      options: "SkipAllParameterization,IncludeComments",
    }),
  }).then((response) => {
    return response.json();
  });

  return resourceGroupARM;
}

export async function azGetResourceContainersTree(accessToken: string) {
  //We get all the subscriptions available
  let subscriptions = await azGetSubscriptions(accessToken);

  //Should be optimized to parallelize those 2, or single query ?
  //We get all the containers from those subscriptions
  let resourceContainers = await azGetResourceContainers(
    accessToken,
    subscriptions
  );

  //We get all the resources from those subscriptions
  let resources = await azGetResources(accessToken, subscriptions);

  //We flatten all of that
  let MGFlatList = createMGFlatList(resourceContainers);
  let SubscriptionsFlatList = createSubscriptionsFlatList(resourceContainers);
  let ResourceGroupsFlatList = createResourceGroupsFlatList(resourceContainers);
  let ResourcesFlatList = createResourcesFlatList(resources);

  //Merging them in a single flat list
  let tree = constructTree(
    MGFlatList,
    SubscriptionsFlatList,
    ResourceGroupsFlatList,
    ResourcesFlatList
  );

  //This is to fix resource group upper case ARM issue
  let tree2 = ToLowerCase(tree);

  return tree2;
}

function ToLowerCase(tree: any) {
  let tree2: any = [];
  tree.forEach((element: any) => {
    element["TreeParentID"] = element["TreeParentID"]
      ? element["TreeParentID"].toLowerCase()
      : null;
    element["TreeID"] = element["TreeID"].toLowerCase();
    tree2.push(element);
  });

  return tree2;
}

function createResourcesFlatList(resources: any) {
  let flatList: any = [];
  resources.data.forEach((resource: any) => {
    if (
      !flatList.some(function (resourceGroupItem: any) {
        return resourceGroupItem.TreeID === resource.id;
      })
    ) {
      resource["TreeParentID"] =
        "/subscriptions/" +
        resource.subscriptionId +
        "/resourceGroups/" +
        resource.resourceGroup;
      resource["TreeID"] = resource.id;
      resource["TreeName"] = resource.name;
      flatList.push({
        ...resource,
      });
    }
    return flatList;
  });

  return flatList;
}

function createResourceGroupsFlatList(resourceContainers: any) {
  let flatList: any = [];
  resourceContainers.data.forEach((resourceContainer: any) => {
    if (
      resourceContainer.type ===
      "microsoft.resources/subscriptions/resourcegroups"
    ) {
      flatList = addResourceGroupsToFlatList(flatList, resourceContainer);
    }
  });

  return flatList;
}

function addResourceGroupsToFlatList(tree: any, resourcegroup: any) {
  if (
    !tree.some(function (resourceGroupItem: any) {
      return resourceGroupItem.TreeID === resourcegroup.id;
    })
  ) {
    resourcegroup["TreeParentID"] = resourcegroup.subscriptionId;
    resourcegroup["TreeID"] = resourcegroup.id;
    resourcegroup["TreeName"] = resourcegroup.name;
    tree.push({
      ...resourcegroup,
    });
  }
  return tree;
}

function createSubscriptionsFlatList(resourceContainers: any) {
  let flatList: any = [];
  resourceContainers.data.forEach((resourceContainer: any) => {
    if (resourceContainer.type === "microsoft.resources/subscriptions") {
      flatList = addSubscriptionsToFlatList(flatList, resourceContainer);
    }
  });

  return flatList;
}

function addSubscriptionsToFlatList(tree: any, subscription: any) {
  if (
    !tree.some(function (subscriptionItem: any) {
      return subscriptionItem.TreeID === subscription.subscriptionId;
    })
  ) {
    subscription["TreeParentID"] =
      subscription.properties.managementGroupAncestorsChain[0].name;
    subscription["TreeID"] = subscription.subscriptionId;
    subscription["TreeName"] = subscription.name;
    tree.push({
      ...subscription,
    });
  }
  return tree;
}

function createMGFlatList(resourceContainers: any) {
  let flatList: any = [];
  //We add management Group to the flat list
  //Note : only the management group that have subscriptions will be present
  //This is because we are getting the management group from subscriptions properties
  resourceContainers.data.forEach((resourceContainer: any) => {
    //if it is a subscription
    if (resourceContainer.type === "microsoft.resources/subscriptions") {
      flatList = addManagementGroupToFlatList(
        flatList,
        resourceContainer.properties.managementGroupAncestorsChain
      );
    }
  });
  return flatList;
}

function addManagementGroupToFlatList(
  tree: any,
  managementGroupAncestorsChain: any
) {
  for (let i = managementGroupAncestorsChain.length - 1; i >= 0; i--) {
    //if the MG does not already exist then add it
    if (
      !tree.some(function (MG: any) {
        return MG.TreeID === managementGroupAncestorsChain[i].name;
      })
    ) {
      tree.push({
        TreeID: managementGroupAncestorsChain[i].name,
        TreeName: managementGroupAncestorsChain[i].displayName,
        displayName: managementGroupAncestorsChain[i].displayName,
        type: "ManagementGroup",
        TreeParentID:
          i === managementGroupAncestorsChain.length - 1
            ? null
            : managementGroupAncestorsChain[i + 1].name,
      });
    }
  }
  return tree;
}

async function azGetSubscriptions(accessToken: string) {
  const bearerToken = "Bearer " + accessToken;
  const subscriptions = await fetch(
    "https://management.azure.com/subscriptions?api-version=2020-01-01",
    {
      method: "get",
      headers: new Headers({
        Authorization: bearerToken,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data.value;
    });
  return subscriptions;
}

async function azGetResourceContainers(
  accessToken: string,
  subscriptions: any
) {
  const bearerToken = "Bearer " + accessToken;
  const bodySubscriptions = subscriptions.map((subscription: any) => {
    return subscription.subscriptionId;
  });
  const body = {
    subscriptions: bodySubscriptions,
    query: "resourcecontainers ",
    options: {
      resultFormat: "objectArray",
    },
  };
  const response = await fetch(
    "https://management.azure.com/providers/Microsoft.ResourceGraph/resources?api-version=2019-04-01",
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: bearerToken,
      }),
      body: JSON.stringify(body),
    }
  );
  const resourceContainers = await response.json();

  return resourceContainers;
}

function constructTree(
  MGFlatList: any,
  SubscriptionsFlatList: any,
  ResourceGroupsFlatList: any,
  ResourcesFlatList: any
) {
  let tree: any = [];
  tree.push(...MGFlatList);
  tree.push(...SubscriptionsFlatList);
  tree.push(...ResourceGroupsFlatList);
  tree.push(...ResourcesFlatList);

  return tree;
}

async function azGetResources(accessToken: string, subscriptions: any) {
  const bearerToken = "Bearer " + accessToken;
  const query = "resources";
  const bodySubscriptions = subscriptions.map((subscription: any) => {
    return subscription.subscriptionId;
  });
  const body = {
    subscriptions: bodySubscriptions,
    query: query,
    options: {
      resultFormat: "objectArray",
    },
  };
  const response = await fetch(
    "https://management.azure.com/providers/Microsoft.ResourceGraph/resources?api-version=2019-04-01",
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: bearerToken,
      }),
      body: JSON.stringify(body),
    }
  );
  const resources = await response.json();
  return resources;
}
