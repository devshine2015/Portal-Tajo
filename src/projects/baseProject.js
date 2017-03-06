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
import injectTapEventPlugin from 'react-tap-event-plugin';
// import { setLocale } from 'utils/i18n';
import { TranslationProvider } from 'utils/i18n';
import phrases, { locales } from 'configs/phrases';

injectTapEventPlugin();

require('sanitize.css/sanitize.css');

// set system language on app initialisation
// setLocale(navigator.language);

export const renderProject = ({
  anchor,
  createRoutes,
  configureStore,
  createReducer,
}) => {
  // Create redux store with history
  // this uses the singleton
  const initialState = {};
  const store = configureStore(initialState, browserHistory, createReducer);

  ReactDOM.render(
    <Provider store={store}>
      <TranslationProvider phrases={phrases} locales={locales} >
        {createRoutes(store)}
      </TranslationProvider>
    </Provider>, anchor
  );
};

export const renderProjectWithoutRoutes = ({
  anchor,
  rootNode,
  configureStore,
  createReducer,
}) => {
  // Create redux store with history
  // this uses the singleton
  const initialState = {};
  const store = configureStore(initialState, browserHistory, createReducer);

  ReactDOM.render(
    <Provider store={store}>
      {rootNode}
    </Provider>, anchor
  );
};
