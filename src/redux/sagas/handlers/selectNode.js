import { call, put } from "redux-saga/effects";
import { setDetail } from "../../ducks/detailSlice";

export function* handleSelectNode(action) {
  try {
    const response = yield call(getNodeInfo, action.payload);
    console.log(response);
    yield put(setDetail(response));
  } catch (error) {
    console.log(error);
  }
}

export function getNodeInfo(payload) {
  return {
    id: payload,
  };
}
