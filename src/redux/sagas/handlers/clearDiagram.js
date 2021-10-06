import { call, put } from "redux-saga/effects";
import { setDiagram } from "../../ducks/diagramSlice";
import { setDiagramElements } from "../../ducks/diagramSlice";

export function* handleClearDiagram(action) {
  try {
    var nodes = [];

    var edges = [];

    var returnElements = { nodes, edges };

    yield put(setDiagramElements(returnElements));
  } catch (error) {
    console.log(error);
  }
}
