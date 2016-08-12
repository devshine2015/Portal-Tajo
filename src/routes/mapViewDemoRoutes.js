import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { selectLocationState } from './helpers';

const ROOT = '/portal/:fleet/mapViewDemo/';

export default function createRoutes(store) {
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  const mapAndListRoute = require('screens/MapViewDemo/route')({
    path: 'map',
  });

  const loginRoute = require('screens/LoginScreenDemo/route')({
    path: 'login',
  });

  const rootRoute = require('screens/Root/route')({
    path: ROOT,
    dispatch: store.dispatch,
  });

  rootRoute.indexRoute = {
    component: require('screens/MapViewDemo').default,
  };

  rootRoute.childRoutes.push(
    loginRoute,
    mapAndListRoute,
  );

  return (
    <Router
      history={history}
      routes={rootRoute}
    />
  );
}
