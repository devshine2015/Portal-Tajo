import React from 'react';
import { getHooks } from 'utils/hooks';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  isAlerts,
} from 'configs';
import mainMenu from 'configs/mainMenu';
import {
  errorHandler,
  loadModule,
  selectLocationState,
} from 'utils/routerHelpers';

import rootScreen from 'screens/Root/route';
import operationalScreen from 'screens/Operational/route';
import reportsScreen from 'screens/ReportsScreen/route';
import execReportsScreen from 'screens/ExecReports/route';
import vehiclesManagerScreen from 'screens/VehiclesManagerScreen/route';
import loginScreen from 'screens/LoginScreen/route';
// import loginCallbackScreen from 'screens/LoginCallback/route';
import dashboardScreen from 'screens/Dashboard/route';
import chronicleScreen from 'screens/Chronicle/route';
import profileScreen from 'screens/Profile/route';
import alersEditorScreen from 'screens/AlertsEditor/route';
import notFoundScreen from 'screens/NotFound/route';
import usersManagerScreen from 'screens/UsersManager/route';
import alertLogsScreen from 'screens/AlertsLog/route';

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

  const profileRoute = profileScreen(mainMenu.sunshine.profile);

  const usersManagerRoute = usersManagerScreen(mainMenu.sunshine.users);

  const alertsEditorRoute = alersEditorScreen(mainMenu.sunshine.alerts);

  const execReportRoute = execReportsScreen(mainMenu.sunshine.execReport);

  const alertsLogsRoute = alertLogsScreen(mainMenu.escape.alertsLogs);

  const loginRoute = loginScreen({
    path: 'login',
  });

  const notFoundRoute = notFoundScreen({
    path: 'not-found',
  });

  const rootRoute = rootScreen({
    path: '/',
    dispatch: store.dispatch,
    mainMenu: mainMenu.sunshine,
  });

  rootRoute.indexRoute = {
    component: require('screens/Operational').default,
  };

  rootRoute.childRoutes.push(
    loginRoute,
    reviewScreen,
    operationalRoute,
    chronicleRoute,
    reportsRoute,
    execReportRoute,
    vehiclesEditorRoute,
    notFoundRoute,
    usersManagerRoute,
    alertsLogsRoute,
// TODO: uncomment when releasing alerts system
//    alertsEditorRoute,
//    profileRoute
  );

// TODO: uncomment alertsEditorRoute above when removing isAlert dev flag
  if (isAlerts) {
    rootRoute.childRoutes.push(alertsEditorRoute);
  }
  rootRoute.childRoutes.push(profileRoute);

  return (
    <Router
      history={history}
      routes={rootRoute}
      onError={errorHandler}
    />
  );
}
