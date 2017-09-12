/**
 * escape.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
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

  ReactDOM.render(
    <Provider store={store}>
      {createRoutes(store, createReducer)}
    </Provider>,
    document.getElementById(anchorId),
  );
};

export default renderProject;
