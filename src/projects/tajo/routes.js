import React from 'react';
import { getHooks } from 'utils/hooks';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ROOT_ROUTE } from 'configs';
import mainMenu from 'configs/mainMenu';
import {
  errorHandler,
  loadModule,
  selectLocationState,
} from 'utils/routerHelpers';

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  const reportsRoute = require('screens/ReportsScreen/route')({
    path: 'reports',
    injectReducer,
    errorHandler,
    loadModule,
  });

  const promoRoute = require('screens/PromoTrackingScreen/route')({
    ...mainMenu.tajo.promos,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const installerRoute = require('screens/InstallerScreen/route')({
    ...mainMenu.tajo.installer,
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

  const usersManagerRoute = require('screens/UsersManager/route')({
    path: 'users',
    injectReducer,
    errorHandler,
    loadModule,
  });

  const devicesManagerRoute = require('screens/DevicesManager/route')({
    ...mainMenu.tajo.devices,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const loginRoute = require('screens/LoginScreen/route')({
    path: 'login',
  });

  const dashboardRoute = require('screens/DashboardScreen/route')(mainMenu.tajo.dashboard);

  const rootRoute = require('screens/Root/route')({
    path: ROOT_ROUTE,
    dispatch: store.dispatch,
    mainMenu: mainMenu.tajo,
  });

  rootRoute.indexRoute = {
    component: dashboardRoute.component,
    name: dashboardRoute.name,
    protected: dashboardRoute.protected,
  };

  // order of menu depends of pushing order
  rootRoute.childRoutes.push(
    loginRoute,
    dashboardRoute,
    installerRoute,
    promoRoute,
    reportsRoute,
    vehiclesEditorRoute,
    usersManagerRoute,
    devicesManagerRoute,
  );

  return (
    <Router
      history={history}
      routes={rootRoute}
    />
  );
}
