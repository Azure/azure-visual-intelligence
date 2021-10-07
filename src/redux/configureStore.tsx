import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
//Persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
//Slice
import userReducer from "./ducks/userSlice";
import settingsReducer from "./ducks/settingsSlice";
import diagramReducer from "./ducks/diagramSlice";
import detailReducer from "./ducks/detailSlice";
import resourcesReducer from "./ducks/resourcesSlice";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer, //userReducer,
  resources: resourcesReducer,
  diagram: diagramReducer,
  detail: detailReducer,
  settings: settingsReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

const persistor = persistStore(store);

export { store, persistor };
