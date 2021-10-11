import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/userSlice";
import { setResources } from "../../ducks/resourcesSlice";
import { azGetResourceContainersTree } from "../../../api/azure/azarm";

export function* handleUserAuthent(action) {
  try {
    yield put(setUser(action.payload));
    const response = yield call(requestGetResources, {
      ...action.payload,
    });

    yield put(setResources(response));
  } catch (error) {
    console.log(error);
  }
}

export function requestGetResources(payload) {
  return azGetResourceContainersTree(payload.accessToken);
}
