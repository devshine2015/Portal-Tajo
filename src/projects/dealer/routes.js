import React from 'react';
import { Router } from 'react-router';
import { ROOT_ROUTE } from 'configs';
import mainMenu from 'configs/mainMenu';
import rootScreen from 'screens/Root/route';
import loginScreen from 'screens/LoginScreen/route';
import {
  errorHandler,
  // loadModule,
} from '../utils/routerHelpers';

export default function createRoutes(dispatch, history/* , injectReducer */) {
  const loginRoute = loginScreen({
    path: 'login',
  });

  const rootRoute = rootScreen({
    dispatch,
    path: ROOT_ROUTE,
    mainMenu: mainMenu.escape,
  });

  rootRoute.childRoutes.push(
    loginRoute,
  );

  return (
    <Router
      history={history}
      routes={rootRoute}
      onError={errorHandler}
    />
  );
}
