import { takeLatest } from "redux-saga/effects";
import { handleUserAuthent } from "./handlers/userAuthent";
import { handleDragnDrop } from "./handlers/dragndrop";

export function* watcherSaga() {
  yield takeLatest("AAD_LOGIN_SUCCESS", handleUserAuthent);
  yield takeLatest("DRAG_FROM_AZURE_EXISTING_RESOURCES", handleDragnDrop);
  //yield takeLatest(getResources.type, handleUserAuthent);
}
