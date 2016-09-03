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
  niceName: 'Dashboard',
  path: 'dashboard',
  order: 0,
}, {
  niceName: 'Operational',
  path: 'map',
  order: 1,
}, {
  niceName: 'Reports',
  path: 'reports',
  order: 3,
}, {
  niceName: 'Vehicles Editor',
  path: 'vehicles',
  order: 4,
}, {
  niceName: 'History',
  path: 'history',
  order: 5,
}];

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  const mapAndListRoute = require('screens/Operational/route')({
    path: 'map',
    dispatch: store.dispatch,
  });

  const dashboardRoute = require('screens/DashboardScreen/route')({
    path: 'dashboard',
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });

  const chronicleRoute = require('screens/Chronicle/route')({
    path: 'history',
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });


  const reportsRoute = require('screens/ReportsScreen/route')({
    path: 'reports',
    injectReducer,
    errorHandler,
    loadModule,
  });

  const vehiclesEditorRoute = require('screens/VehiclesManagerScreen/route')({
    path: 'vehicles',
    injectReducer,
    errorHandler,
    loadModule,
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
    reportsRoute,
    chronicleRoute,
    vehiclesEditorRoute,
  );

  return (
    <Router
      history={history}
      routes={rootRoute}
    />
  );
}
