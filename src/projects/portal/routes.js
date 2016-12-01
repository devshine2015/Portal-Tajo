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

  const reviewScreen = require('screens/DashboardScreen/route')(mainMenu.portal.review);

  const operationalRoute = require('screens/Operational/route')(mainMenu.portal.operational);

  const chronicleRoute = require('screens/Chronicle/route')({
    ...mainMenu.portal.history,
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });


  const reportsRoute = require('screens/ReportsScreen/route')({
    ...mainMenu.portal.reports,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const vehiclesEditorRoute = require('screens/VehiclesManagerScreen/route')({
    ...mainMenu.portal.vehicles,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const loginRoute = require('screens/LoginScreen/route')({
    path: 'login',
  });

  const rootRoute = require('screens/Root/route')({
    path: ROOT_ROUTE,
    dispatch: store.dispatch,
    mainMenu: mainMenu.portal,
  });

  rootRoute.indexRoute = {
    component: require('screens/Operational').default,
    protected: operationalRoute.protected,
  };

  rootRoute.childRoutes.push(
    loginRoute,
    reviewScreen,
    operationalRoute,
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
