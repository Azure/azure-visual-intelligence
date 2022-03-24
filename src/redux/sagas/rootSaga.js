import { takeLatest } from "redux-saga/effects";
import { handleUserAuthent } from "./handlers/userAuthent";
import { handleDragnDrop } from "./handlers/dragndrop";
import { handleLoadDiagram } from "./handlers/loadDiagram";
import { handleClearDiagramResources } from "./handlers/clearDiagram";
import { handleNewDiagramResources } from "./handlers/newDiagramResources.js";
import { handleSelectNode } from "./handlers/selectNode";
import { handleChangeLayout } from "./handlers/changeLayout";
import { handleChangeOverlay } from "./handlers/changeOverlay";
import { handleResourcesMenu } from "./handlers/handleResourcesMenu";

export function* watcherSaga() {
  //user Action
  yield takeLatest("AAD_LOGIN_SUCCESS", handleUserAuthent);
  yield takeLatest("DRAGnDROP", handleDragnDrop);
  yield takeLatest("LOAD_DIAGRAM", handleLoadDiagram);
  yield takeLatest("CLEAR_DIAGRAM", handleClearDiagramResources);
  yield takeLatest("SELECT_NODE", handleSelectNode);
  yield takeLatest("CHANGE_LAYOUT", handleChangeLayout);
  yield takeLatest("CHANGE_OVERLAY", handleChangeOverlay);

  //cascading Action
  //yield takeLatest("diagram/setDiagramResources", handleNewDiagramResources);
  yield takeLatest("diagram/setDiagramRelations", handleNewDiagramResources);
  yield takeLatest("user/setUser", handleResourcesMenu);
  
}
