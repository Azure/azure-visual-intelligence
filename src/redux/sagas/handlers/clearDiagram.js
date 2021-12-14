import { put } from "redux-saga/effects";
import { setDiagramResources } from "../../ducks/diagramSlice";

export function* handleClearDiagramResources(action) {
  try {
    var resources = [];

    yield put(setDiagramResources(resources));
  } catch (error) {
    console.log(error);
  }
}
