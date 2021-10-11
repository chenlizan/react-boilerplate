/**
 * Created by chenlizan on 2017/6/21.
 */

import { createAction } from "redux-actions";

export const login_requested_creator = createAction("LOGIN_REQUESTED");
export const login_succeeded_creator = createAction("LOGIN_SUCCEEDED");
export const login_failed_creator = createAction("LOGIN_FAILED");

export const startListener = createAction("IM_START_LISTENER");
export const stopListener = createAction("IM_STOP_LISTENER");
export const receive = createAction("RECEIVE");
export const secs = createAction("SECS");
