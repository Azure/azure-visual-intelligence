import { takeLatest } from "redux-saga/effects";
import { handleUserAuthent } from "./handlers/userAuthent";
import { handleDragnDrop } from "./handlers/dragndrop";
import { handleLoadDiagram } from "./handlers/loadDiagram";

export function* watcherSaga() {
  yield takeLatest("AAD_LOGIN_SUCCESS", handleUserAuthent);
  yield takeLatest("DRAGnDROP", handleDragnDrop);
  yield takeLatest("LOAD_DIAGRAM", handleLoadDiagram);
}
