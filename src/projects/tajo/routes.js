import React from 'react';
import { Router } from 'react-router';
import InitialScreen from 'screens/Dashboard';
import screens, { createRootRoute } from './screensConfig';
import {
  errorHandler,
  makeScreenCreator,
} from '../utils/routerHelpers';

export default function createRoutes(dispatch, history, injectReducer) {
  const screenCreator = makeScreenCreator(dispatch, injectReducer);
  const rootRoute = createRootRoute(screenCreator);
  const rootChildRoutes = screens.map(screenCreator);

  rootRoute.indexRoute = {
    component: InitialScreen,
    name: 'dashboard',
    protected: true,
  };

  rootRoute.childRoutes = rootChildRoutes;

  return (
    <Router
      history={history}
      routes={rootRoute}
      onError={errorHandler}
    />
  );
}
