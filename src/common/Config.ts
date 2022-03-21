// Use CommonJS require below so we can dynamically import during build-time.
import * as prodConfig from "./Config.prod";
import * as debugConfig from "./Config.dev";
import { Configuration } from "@azure/msal-browser";

let msalConfig: Configuration;

if (process.env.NODE_ENV === "production") {
  msalConfig = prodConfig.msalConfig;
} else {
  msalConfig = debugConfig.msalConfig;
}

const loginRequest = {
  scopes: ["https://management.core.windows.net/user_impersonation"],
};

const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export {
  msalConfig as msalConfig,
  loginRequest as loginRequest,
  graphConfig as graphConfig,
};
