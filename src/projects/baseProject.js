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
import configureStore from 'configs/store';
import {
  init as initConfigs,
  project,
  isFeatureSupported,
} from 'configs';
import { WebAuthentication } from 'utils/auth';
import { create as createHistory } from 'utils/history';
import {
  onSuccess,
  onFailure,
} from 'services/Session/authHelpers';
import getHooks from './utils/hooks';
import { syncHistory as getHistory } from './utils/routerHelpers';
import createRoutes from './utils/createRoutes';
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
  const history = createHistory(getBase());
  // Create redux store with history
  const store = configureStore(initialState, history, createReducer);
  // instantiate auth with read token
  const auth = new WebAuthentication({
    auth0SupportLevel: isFeatureSupported('auth0Full') ? 'full' : 'none',
  });

  await auth.initialAuthentication(
    profile,
    overwrite => onSuccess(profile, store.dispatch, { overwrite }),
    () => onFailure(store.dispatch),
  );

  const { injectReducer } = getHooks(store, createReducer);
  const routes = createRoutes(store.dispatch, getHistory(store, history), injectReducer, auth, routesConfig);

  ReactDOM.render(
    <Provider store={store}>
      { routes }
    </Provider>,
    document.getElementById(anchorId),
  );
};

export default renderProject;

function getBase() {
  return project === 'tajo' ? '/tajo' : '';
}
