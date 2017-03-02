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

import rootScreen from 'screens/Root/route';
import operationalScreen from 'screens/Operational/route';
import reportsScreen from 'screens/ReportsScreen/route';
import vehiclesManagerScreen from 'screens/VehiclesManagerScreen/route';
import loginScreen from 'screens/LoginScreen/route';
import dashboardScreen from 'screens/DashboardScreen/route';
import chronicleScreen from 'screens/Chronicle/route';
import settingsScreen from 'screens/Settings/route';
import alersEditorScreen from 'screens/AlertsEditor/route';

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  const reviewScreen = dashboardScreen(mainMenu.sunshine.review);

  const operationalRoute = operationalScreen(mainMenu.sunshine.operational);

  const chronicleRoute = chronicleScreen({
    ...mainMenu.sunshine.history,
    injectReducer,
    errorHandler,
    loadModule,
    dispatch: store.dispatch,
  });


  const reportsRoute = reportsScreen({
    ...mainMenu.sunshine.reports,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const vehiclesEditorRoute = vehiclesManagerScreen({
    ...mainMenu.sunshine.vehicles,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const settingsRoute = settingsScreen(mainMenu.sunshine.settings);

  const alertsEditorRoute = alersEditorScreen(mainMenu.sunshine.alerts);

  const loginRoute = loginScreen({
    path: 'login',
  });

  const rootRoute = rootScreen({
    path: ROOT_ROUTE,
    dispatch: store.dispatch,
    mainMenu: mainMenu.sunshine,
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
    settingsRoute,
    alertsEditorRoute,
  );

  return (
    <Router
      history={history}
      routes={rootRoute}
    />
  );
}
