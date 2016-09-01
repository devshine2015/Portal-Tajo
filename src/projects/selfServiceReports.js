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
import qs from 'query-string';
import configureStore from '../redux/store';
import { createSelfServiceReducer } from '../redux/reducers';
import SelfServiceReport from 'containers/SelfServiceReport';

injectTapEventPlugin();

require('sanitize.css/sanitize.css');

// Create redux store with history
// this uses the singleton
const initialState = {};
const store = configureStore(initialState, browserHistory, createSelfServiceReducer);

function getFleetNameFromUrl() {
  const params = qs.parse(window.location.search);

  return params.fleet;
}

ReactDOM.render(
  <Provider store={store}>
    <SelfServiceReport fleet={getFleetNameFromUrl()} />
  </Provider>,
  document.getElementById('root')
);
