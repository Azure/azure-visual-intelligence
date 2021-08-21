import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./redux/configureStore";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./common/Config";
import { Provider } from "react-redux";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

const msalInstance = new PublicClientApplication(msalConfig);
//const dispatch = useDispatch();

msalInstance.addEventCallback((message) => {
  if (message.eventType === EventType.LOGIN_SUCCESS) {
    store.dispatch({
      type: "AAD_LOGIN_SUCCESS",
      payload: message.payload,
    });
  }
});

ReactDOM.render(
  <div
    style={{
      height: "100%",
      position: "absolute",
      left: "0px",
      width: "100%",
    }}
  >
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App style={{ height: "100vh" }} />
      </Provider>
    </MsalProvider>
  </div>,

  document.getElementById("root")
);