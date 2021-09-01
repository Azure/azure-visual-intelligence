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

    console.log(response);

    yield put(setResources(response));
  } catch (error) {
    console.log(error);
  }
}

export function requestGetResources(payload) {
  return azGetResourceContainersTree(payload.accessToken);
  /*return axios.request({
    method: "get",
    url: "https://my-json-server.typicode.com/atothey/demo/user",
  });*/
}
