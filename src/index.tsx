import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { store } from "./redux/configureStore";
//import { store, persistor } from "./redux/configureStore";
import {
  PublicClientApplication,
  Configuration,
  EventType,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./common/Config";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import { PersistGate } from "redux-persist/integration/react";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((message) => {
  if (message.eventType === EventType.LOGIN_SUCCESS) {
    store.dispatch({
      type: "AAD_LOGIN_SUCCESS",
      payload: message.payload,
    });
  }
});
//To add between provider and dnd provider
//<PersistGate loading={null} persistor={persistor}> </PersistGate>

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
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </MsalProvider>
  </div>,
  document.getElementById("root")
);
