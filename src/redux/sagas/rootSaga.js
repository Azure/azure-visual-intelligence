import { takeLatest } from "redux-saga/effects";
import { handleUserAuthent } from "./handlers/userAuthent";

export function* watcherSaga() {
  yield takeLatest("AAD_LOGIN_SUCCESS", handleUserAuthent);
  //yield takeLatest(getResources.type, handleUserAuthent);
}
