import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//import authSlice from './authslice';
import graphReducer from "./graphSlice";

export const store = configureStore({
  reducer: {
    graph: graphReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
