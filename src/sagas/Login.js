/**
 * Created by chenlizan on 2018/5/4.
 */

import {delay} from 'redux-saga';
import {call, put, takeEvery} from 'redux-saga/effects';
import {createAction} from 'redux-actions';

function* loginProcess(action) {
    try {
        yield delay(2000);
        yield put(createAction('ACCEPT_LOGIN_INFO')('Login successful'));
    } catch (e) {
        yield put(createAction('USER_FETCH_FAILED')(e.message));
    }
}

export function* login() {
    yield takeEvery('SAVE_LOGIN_INFO', loginProcess);
}
