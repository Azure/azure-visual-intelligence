import { call, put } from "redux-saga/effects";
import { setResources } from "../../ducks/resourcesSlice";
import { azGetResourceContainersTree } from "../../../api/azure/azarm";

export function* handleResourcesMenu(action:any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetResources, {
      ...action.payload,
    });

    yield put(setResources(response));
  } catch (error) {
    console.log(error);
  }
}

export function requestGetResources(payload:any) {
  return azGetResourceContainersTree(payload.accessToken);
}
