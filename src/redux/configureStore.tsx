import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
//Persist
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
//import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
//Slice
import userReducer from "./ducks/userSlice";
import settingsReducer from "./ducks/settingsSlice";
import diagramReducer from "./ducks/diagramSlice";
import detailReducer from "./ducks/detailSlice";
import resourcesReducer from "./ducks/resourcesSlice";
import armEngineReducer from "./ducks/armEngineSlice";

const sagaMiddleware = createSagaMiddleware();

/*
const persistUserConfig = {
  key: "user",
  storage,
};

const persistResourcesConfig = {
  key: "resources",
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedResourcesReducer = persistReducer(
  persistResourcesConfig,
  resourcesReducer
);*/

const store = configureStore({
  reducer: {
    user: userReducer,
    AvailableResources: resourcesReducer,
    diagram: diagramReducer,
    detail: detailReducer,
    settings: settingsReducer,
    armEngine: armEngineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActionPaths: [
          "payload.expiresOn",
          "payload.extExpiresOn",
          "user.expiresOn",
          "user.extExpiresOn",
        ],
        ignoredPaths: [
          "payload.expiresOn",
          "payload.extExpiresOn",
          "user.expiresOn",
          "user.extExpiresOn",
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

const persistor = persistStore(store);

export { store, persistor };
