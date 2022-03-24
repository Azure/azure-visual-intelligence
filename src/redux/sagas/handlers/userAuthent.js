import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/userSlice";
import { setResources } from "../../ducks/resourcesSlice";

export function* handleUserAuthent(action) {
  try {
    yield put(setUser(action.payload));
  } catch (error) {
    console.log(error);
  }
}
