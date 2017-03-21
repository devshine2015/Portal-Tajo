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
import promoScreen from 'screens/PromoTrackingScreen/route';
import installerScreen from 'screens/InstallerScreen/route';
import vehiclesManagerScreen from 'screens/VehiclesManagerScreen/route';
import usersManagerScreen from 'screens/UsersManager/route';
import devicesManagerScreen from 'screens/DevicesManager/route';
import loginScreen from 'screens/LoginScreen/route';
import dashboardScreen from 'screens/DashboardScreen/route';
import settingsScreen from 'screens/Settings/route';
import alertsEditorScreen from 'screens/AlertsEditor/route';

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  const operationalRoute = operationalScreen({
    ...mainMenu.escape.operational,
  });

  const reportsRoute = reportsScreen({
    ...mainMenu.escape.reports,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const promoRoute = promoScreen({
    ...mainMenu.escape.promos,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const installerRoute = installerScreen({
    ...mainMenu.escape.installer,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const vehiclesEditorRoute = vehiclesManagerScreen({
    ...mainMenu.escape.vehicles,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const usersManagerRoute = usersManagerScreen({
    ...mainMenu.escape.users,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const devicesManagerRoute = devicesManagerScreen({
    ...mainMenu.escape.devices,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const alertsEditorRoute = alertsEditorScreen({
    ...mainMenu.escape.alerts,
    injectReducer,
    errorHandler,
    loadModule,
  });

  const loginRoute = loginScreen({
    path: 'login',
  });

  const mwaLoginRoute = loginScreen({
    path: 'mwa',
  });

  const settingsRoute = settingsScreen(mainMenu.escape.settings);

  const dashboardRoute = dashboardScreen(mainMenu.escape.dashboard);

  const rootRoute = rootScreen({
    path: ROOT_ROUTE,
    dispatch: store.dispatch,
    mainMenu: mainMenu.escape,
  });

  rootRoute.indexRoute = {
    component: dashboardRoute.component,
    name: dashboardRoute.name,
    protected: dashboardRoute.protected,
  };

  // order of menu depends of pushing order
  rootRoute.childRoutes.push(
    loginRoute,
    mwaLoginRoute,
    dashboardRoute,
    operationalRoute,
    installerRoute,
    promoRoute,
    reportsRoute,
    vehiclesEditorRoute,
    usersManagerRoute,
    devicesManagerRoute,
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
