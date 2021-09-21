import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./ducks/userSlice";
import settingsReducer from "./ducks/settingsSlice";
import diagramReducer from "./ducks/diagramSlice";
import detailReducer from "./ducks/detailSlice";
import resourcesReducer from "./ducks/resourcesSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    resources: resourcesReducer,
    diagram: diagramReducer,
    detail: detailReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;
