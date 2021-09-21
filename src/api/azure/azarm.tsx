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

  /*
  console.log("MGFlatList");
  console.log(MGFlatList);
  console.log("SubscriptionsFlatList");
  console.log(SubscriptionsFlatList);
  console.log("ResourceGroupsFlatList");
  console.log(ResourceGroupsFlatList);
  console.log("ResourcesFlatList");
  console.log(ResourcesFlatList);*/

  //Merging them in a single flat list
  let tree = constructTree(
    MGFlatList,
    SubscriptionsFlatList,
    ResourceGroupsFlatList,
    ResourcesFlatList
  );

  return tree;
}

function createResourcesFlatList(resources: any) {
  let flatList: any = [];
  resources.data.forEach((resource: any) => {
    if (
      !flatList.some(function (resourceGroupItem: any) {
        return resourceGroupItem.TreeID === resource.id;
      })
    ) {
      //console.log("sdjfqshldqhsdl");
      //console.log(resource);
      resource["TreeParentID"] =
        "/subscriptions/" +
        resource.subscriptionId +
        "/resourceGroups/" +
        resource.resourceGroup;
      resource["TreeID"] = resource.id;
      resource["TreeName"] = resource.name;
      //resource["TreeICON"] = ;
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
  //We add management Group to the flatlist
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
