import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/userSlice";
import { setResources } from "../../ducks/resourcesSlice";
import { azGetResources } from "../../../api/azure/azarm";

export function* handleUserAuthent(action) {
  try {
    yield put(setUser({ ...action.payload }));
    const response = yield call(requestGetUser, {
      ...action.payload,
    });

    yield put(setResources(response));
  } catch (error) {
    console.log(error);
  }
}

export function requestGetUser(payload) {
  return azGetResources(payload.accessToken);
  /*return axios.request({
    method: "get",
    url: "https://my-json-server.typicode.com/atothey/demo/user",
  });*/
}
