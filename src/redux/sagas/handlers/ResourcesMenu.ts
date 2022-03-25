import { call, put } from "redux-saga/effects";
import { setResources } from "../../ducks/resourcesSlice";
import { argEngine } from "../../../resourcesengines/arg/arg";
import { AVIresource, AVIrelation } from "../../../interfaces";

export function* handleResourcesMenu(action: any): Generator<any, any, any> {
  try {
    const [resources, relations] = yield call(argEngine.ListResources);
    console.log(resources);
    console.log(relations);
    //yield put(setResources(resources));
  } catch (error) {
    console.log(error);
  }
}
