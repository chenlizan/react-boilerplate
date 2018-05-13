/**
 * Created by chenlizan on 2018/5/4.
 */

import {all} from 'redux-saga/effects'
import {loginSaga} from './Login'

export default function* rootSaga() {
    yield all([
        loginSaga()
    ])
}
