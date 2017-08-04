/**
 * boilerplate to bundle up running project
 */

// Load the favicon, the manifest.json file and the .htaccess file
import 'file-loader?name=[name].[ext]!../favicon.ico';
import 'file-loader?name=[name].[ext]!../manifest.json'; // manifest for mobile devices
import 'file-loader?name=[name].[ext]!../.htaccess';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import configureStore from 'configs/store';
import getHooks from './utils/hooks';
import { getHistory } from './utils/routerHelpers';
import createRoutes from './utils/createRoutes';
import { init as initConfigs } from 'configs';
import { Authentication } from 'utils/auth';
import { create as createHistory } from 'utils/history';
import {
  onSuccess,
  onFailure,
} from 'services/Session/authHelpers';
import getInitialState from './helpers';

require('velocity-animate');
require('velocity-animate/velocity.ui');
require('sanitize.css/sanitize.css');

const DEF_ANCHOR_ID = 'app';
initConfigs();

const renderProject = async ({
  anchorId = DEF_ANCHOR_ID,
  routesConfig,
  createReducer,
}) => {
  const { initialState, profile } = await getInitialState();
  // create history which allow to use it everywhere
  // (Not just in components).
  // use this to init Router and store
  const history = createHistory();
  // Create redux store with history
  const store = configureStore(initialState, history, createReducer);
  // instantiate auth with read token
  const auth = new Authentication({
    idToken: profile.idToken,
    accessToken: profile.accessToken,
    onInitSuccess: overwrite => onSuccess(profile, store.dispatch, { overwrite }),
    onInitFailure: () => onFailure(store.dispatch),
  });

  const { injectReducer } = getHooks(store, createReducer);
  const routes = createRoutes(store.dispatch, getHistory(store, browserHistory), injectReducer, auth, routesConfig);

  ReactDOM.render(
    <Provider store={store}>
      { routes }
    </Provider>,
    document.getElementById(anchorId),
  );
};

export default renderProject;
