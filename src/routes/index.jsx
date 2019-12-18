/**
 * Created by chenlizan on 2017/6/18.
 */

import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

const App = Loadable({
    loader: () => import('../App'),
    loading: () => null
});

const Login = Loadable({
    loader: () => import('../containers/Login'),
    loading: () => null
});

const FabricView = Loadable({
    loader: () => import('../views/FabricView'),
    loading: () => null
});

export const routes = (
    <HashRouter>
        <App>
            <Switch>
                <Route path="/" exact component={FabricView}/>
                <Route path="/login" component={Login}/>
                <Route path="/fabric" component={FabricView}/>
            </Switch>
        </App>
    </HashRouter>
);
