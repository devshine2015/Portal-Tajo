/**
 * selfServiceReports.js
 */

import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
// import ReactDOM from 'react-dom';
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

class SsReports extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SelfServiceReport fleet={this.props.fleet} />
      </Provider>
    );
  }
}

SsReports.propTypes = {
  fleet: React.PropTypes.string.isRequired,
};

window.SSREPORT = SsReports;
