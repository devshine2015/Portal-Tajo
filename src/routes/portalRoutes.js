import React from 'react';
import { getHooks } from 'utils/hooks';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  errorHandler,
  loadModule,
  selectLocationState,
} from './helpers';

const ROOT = '/portal/:fleet/tajo/';

const MAIN_MENU = [{
  niceName: 'dashboard',
  path: 'dashboard',
  order: 0,
}, {
  niceName: 'map',
  path: 'map',
  order: 1,
}];

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  const mapAndListRoute = require('screens/MapFleetScreen/route')({
    path: 'map',
  });

  const dashboardRoute = require('screens/DashboardScreen/route')({
    path: 'dashboard',
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });

  const loginRoute = require('screens/LoginScreen/route')({
    path: 'login',
  });

  const rootRoute = require('screens/Root/route')({
    path: ROOT,
    dispatch: store.dispatch,
    mainMenu: MAIN_MENU,
  });

  rootRoute.indexRoute = {
    component: require('screens/DashboardScreen').default,
  };

  rootRoute.childRoutes.push(
    loginRoute,
    dashboardRoute,
    mapAndListRoute,
  );

  return (
    <Router
      history={history}
      routes={rootRoute}
    />
  );
}
