import React from 'react';
import { getHooks } from './utils/hooks';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from 'containers/App';

const ROOT = '/portal/:fleet/tajo/';

// load module only if it is necessary
// see https://blog.mxstbr.com/2016/01/react-apps-with-pages/
// for details
const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

function errorHandler(error) {
  console.error(error);
}

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
  });

  return (
    <Router history={history}>
      <Route
        path={ROOT}
        name="root"
        component={App}
      >
        <Route
          path="dashboard"
          name="dashboard"
          getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('containers/Dashboard').default);
            }, 'dashboard');
          }}
        >
          <Route
            path="reports"
            name="reports"
            getComponent={(location, cb) => {
              require.ensure([], require => {
                const importModules = Promise.all([
                  require('containers/ReportsScreen/reducer'),
                  require('containers/ReportsScreen'),
                ]);

                const renderModule = loadModule(cb);

                importModules.then(([reducer, component]) => {
                  injectReducer('reports', reducer.default);
                  renderModule(component);
                });

                importModules.catch(errorHandler);
              }, 'reports');
            }}
          />
          <Route
            path="installer"
            name="installer"
            getComponent={(location, cb) => {
              require.ensure([], require => {
                const importModules = Promise.all([
                  require('containers/Message/reducer'),
                  require('containers/OfflineData/reducer'),
                  require('containers/Notification/reducer'),
                  require('containers/InstallerScreen/reducer'),
                  require('containers/Message'),
                  require('containers/OfflineData'),
                  require('containers/Notification'),
                  require('containers/InstallerScreen'),
                ]);

                const renderModule = loadModule(cb);

                importModules.then(([
                  messageReducer,
                  offlineReducer,
                  notifiationReducer,
                  installerReducer,
                  messageComponent,
                  offlineDataComponent,
                  notifiationComponent,
                  installerScreenComponent,
                ]) => {
                  injectReducer('message', messageReducer.default);
                  injectReducer('offlineData', offlineReducer.default);
                  injectReducer('notification', notifiationReducer.default);
                  injectReducer('installer', installerReducer.default);
                  renderModule(installerScreenComponent);
                  renderModule(messageComponent);
                  renderModule(notifiationComponent);
                  renderModule(offlineDataComponent);
                });

                importModules.catch(errorHandler);
              }, 'installer');
            }}
          />
          <Route
            path="promos"
            name="promos"
            getComponent={(location, cb) => {
              require.ensure([], require => {
                const importModules = Promise.all([
                  require('containers/PromoTrackingScreen/reducer'),
                  require('containers/PromoTrackingScreen'),
                ]);

                const renderModule = loadModule(cb);

                importModules.then(([reducer, component]) => {
                  injectReducer('promos', reducer.default);
                  renderModule(component);
                });

                importModules.catch(errorHandler);
              }, 'promos');
            }}
          />
        </Route>
        <Route
          path="login"
          name="login"
          getComponent={(location, cb) => {
            require.ensure([], require => {
              const importModules = Promise.all([
                require('containers/LoginScreen/reducer'),
                require('containers/LoginScreen'),
              ]);

              const renderModule = loadModule(cb);

              importModules.then(([reducer, component]) => {
                injectReducer('auth', reducer.default);
                renderModule(component);
              });

              importModules.catch(errorHandler);
            }, 'login');
          }}
        />
      </Route>
    </Router>
  );
}
