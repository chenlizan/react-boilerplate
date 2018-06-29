/**
 * Created by chenlizan on 2017/7/22.
 */

import {handleActions} from "redux-actions"

const initState = {
    account: {},
    result: ''
};

const reducer = handleActions({
    LOGIN_REQUESTED: (state, action) => ({
        ...state, account: action.payload
    }),
    LOGIN_SUCCEEDED: (state, action) => ({
        ...state, result: action.payload
    }),
    LOGIN_FAILED: (state, action) => ({
        ...state, result: action.payload
    }),
}, initState);

export default {initState, reducer};
