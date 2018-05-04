/**
 * Created by chenlizan on 2017/6/18.
 */

import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {initState, reducers} from '../reducers';
import sagas from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = (preloadState) => {
    const store = createStore(
        combineReducers(reducers),
        preloadState || initState,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(sagas);
    return store
};
