import React from 'react';
import { Router } from 'react-router';
import {
  ROOT_ROUTE,
  isAlerts,
} from 'configs';
import mainMenu from 'configs/mainMenu';

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
import {
  errorHandler,
  loadModule,
} from '../utils/routerHelpers';

export default function createRoutes(dispatch, history, injectReducer) {
  const reviewScreen = dashboardScreen(mainMenu.sunshine.review);

  const operationalRoute = operationalScreen(mainMenu.sunshine.operational);

  const chronicleRoute = chronicleScreen({
    ...mainMenu.sunshine.history,
    injectReducer,
    errorHandler,
    loadModule,
    dispatch,
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

  const mwaLoginRoute = loginScreen({
    path: 'mwa',
  });

  const notFoundRoute = notFoundScreen({
    path: 'not-found',
  });

  const rootRoute = rootScreen({
    dispatch,
    path: ROOT_ROUTE,
    mainMenu: mainMenu.sunshine,
  });

  rootRoute.indexRoute = {
    component: require('screens/Operational').default,
    protected: operationalRoute.protected,
  };

  rootRoute.childRoutes.push(
    loginRoute,
    mwaLoginRoute,
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
