/**
 * Created by chenlizan on 2018/5/4.
 */

import { all } from "redux-saga/effects";
import { loginSaga } from "./Login";
import { forkSaga } from "./flow";
import { secsSaga } from "./Secs";

export default function* rootSaga() {
  yield all([forkSaga(), loginSaga(), secsSaga()]);
}
