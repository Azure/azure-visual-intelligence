import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./common/Config";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <App />
    </Provider>
  </MsalProvider>,
  document.getElementById("root")
);
