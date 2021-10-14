import { call } from "redux-saga/effects";
import { handleHideOverlayASC, handleDisplayOverlayASC } from "./OverlayASC";

export function* handleChangeOverlay(action) {
  try {
    //Hide ASC Overlay
    //const response = yield call(getNodeInfo, action.payload);
    console.log(action);
    if (action.payload.includes("Security")) {
      yield call(handleDisplayOverlayASC);
    } else {
      yield call(handleHideOverlayASC);
    }
  } catch (error) {
    console.log(error);
  }
}
