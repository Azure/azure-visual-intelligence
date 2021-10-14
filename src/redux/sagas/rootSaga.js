import { takeLatest } from "redux-saga/effects";
import { handleUserAuthent } from "./handlers/userAuthent";
import { handleDragnDrop } from "./handlers/dragndrop";
import { handleLoadDiagram } from "./handlers/loadDiagram";
import { handleClearDiagram } from "./handlers/clearDiagram";
import { handleSelectNode } from "./handlers/selectNode";
import { handleChangeLayout } from "./handlers/changeLayout";
import {
  handleHideOverlayASC,
  handleDisplayOverlayASC,
} from "./handlers/OverlayASC";

export function* watcherSaga() {
  yield takeLatest("AAD_LOGIN_SUCCESS", handleUserAuthent);
  yield takeLatest("DRAGnDROP", handleDragnDrop);
  yield takeLatest("LOAD_DIAGRAM", handleLoadDiagram);
  yield takeLatest("CLEAR_DIAGRAM", handleClearDiagram);
  yield takeLatest("SELECT_NODE", handleSelectNode);
  yield takeLatest("CHANGE_LAYOUT", handleChangeLayout);
  yield takeLatest("HIDE_OVERLAY_ASC", handleHideOverlayASC);
  yield takeLatest("DISPLAY_OVERLAY_ASC", handleDisplayOverlayASC);
}
