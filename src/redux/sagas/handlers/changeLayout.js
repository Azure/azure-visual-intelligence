import { put } from "redux-saga/effects";
import { setCurrentLayout } from "../../ducks/settingsSlice";
//import { useSelector } from "react-redux";

export function* handleChangeLayout(action) {
  try {
    yield put(setCurrentLayout(action.payload));
  } catch (error) {
    console.log(error);
  }
}
