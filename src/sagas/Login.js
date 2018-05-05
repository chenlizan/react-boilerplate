/**
 * Created by chenlizan on 2018/5/4.
 */

import {delay} from 'redux-saga';
import {call, put, takeEvery} from 'redux-saga/effects';
import {accept_login_info_creator, fetch_failed_info_creator} from '../action'

function* loginProcess(action) {
    try {
        yield delay(2000);
        yield put(accept_login_info_creator('Login successful'));
    } catch (e) {
        yield put(fetch_failed_info_creator(e.message));
    }
}

export function* login() {
    yield takeEvery('SAVE_LOGIN_INFO', loginProcess);
}
