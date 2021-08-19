import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: "2ad0e3b2-8a7a-4b23-b670-0975771be43a",
    authority:
      "https://login.microsoftonline.com/2b0d1330-312c-497a-a034-f2374ee0be2a",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            console.warn(message);
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["https://management.core.windows.net/user_impersonation"],
};

/*
    "https://graph.microsoft.com/user.read",
    "https://graph.microsoft.com/calendars.read",*/
/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const config = {
  appId: "2ad0e3b2-8a7a-4b23-b670-0975771be43a",
  authority:
    "https://login.microsoftonline.com/2b0d1330-312c-497a-a034-f2374ee0be2a",
  redirectUri: "http://localhost:3000",
  scopes: [
    "https://graph.microsoft.com/user.read",
    "https://graph.microsoft.com/calendars.read",
  ],
  argscopes: ["https://management.core.windows.net/user_impersonation"],
  storageAccount: "https://demostorageaccount.blob.core.windows.net",
};
