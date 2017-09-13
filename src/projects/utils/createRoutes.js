import React from 'react';
import { Router } from 'react-router';
// import { ROOT_ROUTE } from 'configs';
import createRootScreen from 'screens/Root/route';
import {
  errorHandler,
  makeScreenCreator,
} from './routerHelpers';

const createRootRoute = (screenCreator, menu) => screenCreator({
  create: createRootScreen,
  options: {
    path: '/',
    mainMenu: menu,
  },
});

export default function createRoutes(dispatch, history, injectReducer, auth, configs = {}) {
  const { screens, initialScreenConfig, menu } = configs;

  const screenCreator = makeScreenCreator(dispatch, injectReducer, auth);
  const rootRoute = createRootRoute(screenCreator, menu);
  const rootChildRoutes = screens.map(screenCreator);

  rootRoute.indexRoute = initialScreenConfig;

  rootRoute.childRoutes = rootChildRoutes;

  return (
    <Router
      history={history}
      routes={rootRoute}
      onError={errorHandler}
    />
  );
}
