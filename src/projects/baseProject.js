/**
 * boilerplate to bundle up running project
 */

import 'babel-polyfill';

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

require('velocity-animate');
require('velocity-animate/velocity.ui');
require('sanitize.css/sanitize.css');

const DEF_ANCHOR_ID = 'app';

const renderProject = ({
  anchorId = DEF_ANCHOR_ID,
  createRoutes,
  createReducer,
}) => {
  const initialState = {};
  const store = configureStore(initialState, browserHistory, createReducer);
  const { injectReducer } = getHooks(store, createReducer);
  const routes = createRoutes(store.dispatch, getHistory(store, browserHistory), injectReducer);

  ReactDOM.render(
    <Provider store={store}>
      { routes }
    </Provider>,
    document.getElementById(anchorId),
  );
};

export default renderProject;
