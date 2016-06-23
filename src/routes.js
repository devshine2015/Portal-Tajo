import React from 'react';
import { getHooks } from './utils/hooks';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const ROOT = '/portal/:fleet/tajo/';

// load module only if it is necessary
// see https://blog.mxstbr.com/2016/01/react-apps-with-pages/
// for details
const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

function errorHandler(error) {
  console.error(error);
}

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  const reportsRoute = require('containers/ReportsScreen/route')({
    path: 'reports',
    injectReducer,
    errorHandler,
    loadModule,
  });

  const promoRoute = require('containers/PromoTrackingScreen/route')({
    path: 'promos',
    injectReducer,
    errorHandler,
    loadModule,
  });

  const installerRoute = require('containers/InstallerScreen/route')({
    path: 'installer',
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });

  const mapAndListRoute = require('containers/MapAndListScreen/route')({
    path: 'map',
  });

  const dashboardRoute = require('containers/Dashboard/route')({
    path: 'dashboard',
  });

  dashboardRoute.childRoutes.push(
    installerRoute,
    reportsRoute,
    promoRoute,
    mapAndListRoute,
  );

  const loginRoute = require('containers/LoginScreen/route')({
    path: 'login',
  });

  const rootRoute = require('containers/App/route')({
    path: ROOT,
  });

  rootRoute.childRoutes.push(
    dashboardRoute,
    loginRoute,
  );

  return (
    <Router
      history={history}
      routes={rootRoute}
    />
  );
}
