import React from 'react';
import { getHooks } from './utils/hooks';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

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
        getComponent={(location, cb) => {
          System.import('containers/App')
            .then(loadModule(cb))
            .catch(errorHandler);
        }}
      >
        <Route
          path="dashboard"
          name="dashboard"
          getComponent={(location, cb) => {
            System.import('containers/Dashboard')
              .then(loadModule(cb))
              .catch(errorHandler);
          }}
        >
          <Route
            path="reports"
            name="reports"
            getComponent={(location, cb) => {
              const importModules = Promise.all([
                System.import('containers/ReportsScreen/reducer'),
                System.import('containers/ReportsScreen'),
              ]);

              const renderModule = loadModule(cb);

              importModules.then(([reducer, component]) => {
                injectReducer('reports', reducer.default);
                renderModule(component);
              });

              importModules.catch(errorHandler);
            }}
          />
          <Route
            path="installer"
            name="installer"
            getComponent={(location, cb) => {
              const importModules = Promise.all([
                System.import('containers/Message/reducer'),
                System.import('containers/OfflineData/reducer'),
                System.import('containers/Notification/reducer'),
                System.import('containers/InstallerScreen/reducer'),
                System.import('containers/Message'),
                System.import('containers/OfflineData'),
                System.import('containers/Notification'),
                System.import('containers/InstallerScreen'),
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
            }}
          />
        </Route>
        <Route
          path="login"
          name="login"
          getComponent={(location, cb) => {
            const importModules = Promise.all([
              System.import('containers/LoginScreen/reducer'),
              System.import('containers/LoginScreen'),
            ]);

            const renderModule = loadModule(cb);

            importModules.then(([reducer, component]) => {
              injectReducer('auth', reducer.default);
              renderModule(component);
            });

            importModules.catch(errorHandler);
          }}
        />
      </Route>
    </Router>
  );
}
