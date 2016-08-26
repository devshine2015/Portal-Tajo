/**
 * selfServiceReports.js
 */

import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../redux/store';
import { createSelfServiceReducer } from '../redux/reducers';
import SelfServiceReport from 'containers/SelfServiceReport';

injectTapEventPlugin();

require('sanitize.css/sanitize.css');

// Create redux store with history
// this uses the singleton
const initialState = {};
const store = configureStore(initialState, browserHistory, createSelfServiceReducer);

ReactDOM.render(
  <Provider store={store}>
    <SelfServiceReport />
  </Provider>,
  document.getElementById('app')
);
