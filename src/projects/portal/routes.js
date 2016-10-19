import React from 'react';
import { getHooks } from 'utils/hooks';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { REACT_ROUTER_ROOT } from 'configs';
import {
  errorHandler,
  loadModule,
  selectLocationState,
} from 'utils/routerHelpers';

const MAIN_MENU = [{
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
    path: REACT_ROUTER_ROOT,
    dispatch: store.dispatch,
    mainMenu: MAIN_MENU,
  });

  rootRoute.indexRoute = {
    component: require('screens/Operational').default,
    protected: mapAndListRoute.protected,
  };

  rootRoute.childRoutes.push(
    loginRoute,
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
