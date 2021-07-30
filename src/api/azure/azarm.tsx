export async function azGetResources(accessToken:string){
    let subscriptions = await azGetSubscriptions(accessToken);
    
    const extendedsubscriptions :any[] = [];
    await Promise.all(subscriptions.map(async (subscription:any) => {
        let resourceGroups = await azGetResourceGroups(accessToken, subscription);
        let extendedsubscription = {
            subscriptionId : subscription.subscriptionId,
            displayName : subscription.displayName,
            resourceGroups : resourceGroups,
        };
        extendedsubscriptions.push(extendedsubscription);
    }));
    return extendedsubscriptions;
}

async function azGetSubscriptions(accessToken:string){
    const bearerToken = 'Bearer ' + accessToken;
    const subscriptions = await fetch('https://management.azure.com/subscriptions?api-version=2020-01-01', { 
        method: 'get', 
        headers: new Headers({
        'Authorization': bearerToken
        })
    })
    .then(response => response.json())
    .then(data => {
        return data.value;
    }
    );
    return subscriptions;
}

async function azGetResourceGroups(accessToken:string, subscription :any){
    const bearerToken = 'Bearer ' + accessToken;
    const body = {
            "subscriptions": [subscription.subscriptionId],
            "query": "resourcecontainers | where type == 'microsoft.resources/subscriptions/resourcegroups'",
            "options" : {
                "resultFormat": "objectArray" 
            }
    };
    const response = await fetch('https://management.azure.com/providers/Microsoft.ResourceGraph/resources?api-version=2019-04-01', { 
        method: 'POST', 
        headers: new Headers({
          'Content-Type' : 'application/json',
          'Authorization': bearerToken
        }),
        body: JSON.stringify(body)
      });
    const resourceGroups = await response.json();

    const extendedresourceGroups :any[] = [];
    await Promise.all(resourceGroups.data.map(async (resourceGroup:any) => {
    //subscriptions.forEach((subscription:any, index:any, array:any[]) =>{
        let resources = await azGetRGResources(accessToken, subscription, resourceGroup.name);
        let extendedresourceGroup = {
            id : resourceGroup.id,
            name : resourceGroup.name,
            resources : resources,
        };
        extendedresourceGroups.push(extendedresourceGroup);
    }));


    return extendedresourceGroups;
}


async function azGetRGResources(accessToken:string, subscription :any, resourceGroup:string){
    const bearerToken = 'Bearer ' + accessToken;
    const query = "resources | where resourceGroup == '" + resourceGroup.toLowerCase() + "'";
    const body = {
            "subscriptions": [subscription.subscriptionId],
            "query": query,
            "options" : {
                "resultFormat": "objectArray" 
            }
    };
    const response = await fetch('https://management.azure.com/providers/Microsoft.ResourceGraph/resources?api-version=2019-04-01', { 
        method: 'POST', 
        headers: new Headers({
          'Content-Type' : 'application/json',
          'Authorization': bearerToken
        }),
        body: JSON.stringify(body)
      });
    const resources = await response.json();
    return resources.data;
}