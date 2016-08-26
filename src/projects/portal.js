/**
 * appPortal.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'babel-polyfill';

// Load the favicon, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!../favicon.ico';
import 'file?name=[name].[ext]!../manifest.json'; // manifest for mobile devices
import 'file?name=[name].[ext]!../.htaccess';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../redux/store';
import createReducer from '../redux/reducers';

injectTapEventPlugin();

require('sanitize.css/sanitize.css');

// Create redux store with history
// this uses the singleton
const initialState = {};
const store = configureStore(initialState, browserHistory, createReducer);

// Set up the router, wrapping all Routes in the App component
import createRoutes from '../routes/portalRoutes';

ReactDOM.render(
  <Provider store={store}>
    {createRoutes(store)}
  </Provider>,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
