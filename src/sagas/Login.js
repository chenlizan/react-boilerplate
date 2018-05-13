/**
 * Created by chenlizan on 2018/5/4.
 */

import {delay} from 'redux-saga';
import {call, put, takeEvery} from 'redux-saga/effects';
import {login_succeeded_creator, login_failed_creator} from '../action'

function* loginProcess(action) {
    try {
        yield delay(2000);
        yield put(login_succeeded_creator('Login successful'));
        yield put(login_succeeded_creator(null));
    } catch (e) {
        yield put(login_failed_creator(e.message));
    }
}

export function* loginSaga() {
    yield takeEvery('LOGIN_REQUESTED', loginProcess);
}
