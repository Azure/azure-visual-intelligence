import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./ducks/userSlice";
import diagramReducer from "./ducks/diagramSlice";
import resourcesReducer from "./ducks/resourcesSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    resources: resourcesReducer,
    diagram: diagramReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;
