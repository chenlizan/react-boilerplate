/**
 * Created by chenlizan on 2018/5/4.
 */

import {all} from 'redux-saga/effects'
import {helloSaga} from './Hello';
import {login} from './Login'

export default function* rootSaga() {
    yield all([
        helloSaga(),
        login()
    ])
}
