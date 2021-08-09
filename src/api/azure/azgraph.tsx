import { graphConfig } from "../../common/Config";

var graph = require("@microsoft/microsoft-graph-client");



function getAuthenticatedClient(accessToken: string) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done: any) => {
      done(null, accessToken);
    },
  });

  return client;
}

export async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api("/me").get();
  return user;
}
// </graphServiceSnippet1>

// <getEventsSnippet>
/*export async function getEvents(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const events = await client
    .api("/me/events")
    .select("subject,organizer,start,end")
    .orderby("createdDateTime DESC")
    .get();

  return events;
}*/


export async function callMsGraph(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}