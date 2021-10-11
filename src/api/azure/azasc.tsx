//https://docs.microsoft.com/en-us/rest/api/securitycenter/alerts/list-by-resource-group
export async function azGetResourceGroupASCRecommandations([
  accessToken,
  resourceGroup,
]: [string, string]) {
  const bearerToken = "Bearer " + accessToken;

  const url =
    "https://management.azure.com" +
    resourceGroup +
    "/providers/Microsoft.Security/alerts?api-version=2021-01-01";
  console.log(url);
  const resourceGroupASCRecommandations = await fetch(url, {
    method: "get",
    headers: new Headers({
      Authorization: bearerToken,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.value;
    });
  console.log(resourceGroupASCRecommandations);
  return resourceGroupASCRecommandations;
}
