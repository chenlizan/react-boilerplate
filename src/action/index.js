/**
 * Created by chenlizan on 2017/6/21.
 */

import {createAction} from 'redux-actions';

export const save_login_info_creator = createAction('SAVE_LOGIN_INFO');
export const accept_login_info_creator = createAction('ACCEPT_LOGIN_INFO');
export const fetch_failed_info_creator = createAction('FETCH_FAILED_INFO');
