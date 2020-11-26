export async function azGetSubscriptions(accessToken:string){
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