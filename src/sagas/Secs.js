import { call, delay, put, take, takeEvery } from "redux-saga/effects";
import { receive } from "../action";

function* process(action) {
  try {
    console.log(action);
  } catch (e) {}
}

export function* secsSaga() {
  // yield takeEvery(receive().type, process);
  while (true) {
    const { payload } = yield take(receive().type);
    console.log(payload);
  }
}
