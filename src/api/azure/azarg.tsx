//import * as msal from "msal";
//import React from "react";
//import { UserAgentApplication } from "msal";
//import { AccessToken, GetTokenOptions } from "@azure/core-http";

//import { config } from "../../common/Config";
//import { getUserDetails } from "./azgraph";

const { HttpHeaders } = require("@azure/ms-rest-js");
const resourceGraph = require("@azure/arm-resourcegraph");

function getCredentialForToken(accessToken:string) {
  return {
    signRequest: (request:any) => {
      if (!request.headers) request.headers = new HttpHeaders();
      request.headers.set("Authorization", `Bearer ${accessToken}`);
      return Promise.resolve(request);
    }
  };
}

export async function azGetSubscriptions(accessToken:string){
    //const subscriptionList = argv.subs.split(",");

    //const query = async () => {
      const credentials = getCredentialForToken(accessToken);
      const client = new resourceGraph.ResourceGraphClient(credentials);
      const result = await client.resources(
          {
              query: "Resources",
              subscriptions: ['3bfaafd1-b638-4262-8794-370d23b971d7'],//subscriptionList,
          },
          { resultFormat: "objectArray" }//or table https://docs.microsoft.com/en-us/javascript/api/@azure/arm-resourcegraph/resultformat?view=azure-node-latest
      );
      console.log("Records: " + result.totalRecords);
      console.log(result.data);
    //};
    
    return result.data;
}
