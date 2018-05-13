/**
 * Created by chenlizan on 2017/6/21.
 */

import {createAction} from 'redux-actions';

export const login_requested_creator = createAction('LOGIN_REQUESTED');
export const login_succeeded_creator = createAction('LOGIN_SUCCEEDED');
export const login_failed_creator = createAction('LOGIN_FAILED');
