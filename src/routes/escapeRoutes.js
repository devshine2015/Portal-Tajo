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
    niceName: 'Promo Subscribtions',
  });

  const installerRoute = require('containers/InstallerScreen/route')({
    path: 'installer',
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });

  const dashboardRoute = require('containers/Dashboard/route')({
    path: 'dashboard',
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });

  dashboardRoute.childRoutes.push(
    installerRoute,
    reportsRoute,
    promoRoute,
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
