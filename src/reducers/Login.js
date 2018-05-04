/**
 * Created by chenlizan on 2017/7/22.
 */

import {handleActions} from "redux-actions"

const initState = {
    account: {},
    result: ''
};

const reducer = handleActions({
    SAVE_LOGIN_INFO: (state, action) => ({
        ...state, account: action.payload
    }),
    ACCEPT_LOGIN_INFO: (state, action) => ({
        ...state, result: action.payload
    }),
}, initState);

export default {initState, reducer};
