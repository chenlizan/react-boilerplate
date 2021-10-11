import { eventChannel, END } from "redux-saga";
import { fork, take, call, put, cancel } from "redux-saga/effects";
import { startListener, stopListener, receive } from "../action";

export const countup = (secs) => {
  return eventChannel((listener) => {
    const iv = setInterval(() => {
      secs += 1;
      if (secs > 0) listener(receive(secs));
    }, 1000);
    return () => {
      clearInterval(iv);
    };
  });
};
function* read() {
  const chan = yield call(countup, 0);
  while (true) {
    let seconds = yield take(chan);
    yield put(seconds);
  }
}

function* handleIO() {
  yield fork(read);
}

function* flow() {
  while (true) {
    yield take(startListener().type);
    const handle = yield fork(handleIO);
    yield take(stopListener().type);
    yield cancel(handle);
  }
}

export function* forkSaga() {
  yield fork(flow);
}
