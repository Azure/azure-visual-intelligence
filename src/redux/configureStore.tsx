import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import graphReducer from "./ducks/graphSlice";
import userReducer from "./ducks/userSlice";
import resourcesReducer from "./ducks/resourcesSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    graph: graphReducer,
    user: userReducer,
    resources: resourcesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;
