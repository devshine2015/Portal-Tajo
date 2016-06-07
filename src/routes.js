import { getHooks } from './utils/hooks';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// load module only if it is necessary
// see https://blog.mxstbr.com/2016/01/react-apps-with-pages/
// for details
const loadModule = (cb) => (componentModule, componentName) => {
  cb(null, componentModule.default);
};

function errorHandler(error) {
  console.error(error);
}

export default function createRoutes(store) {
  const { injectReducer } = getHooks(store);

  return (
    <Router history={browserHistory}>
      <Route
        path="/"
        getComponent={(location, cb) => {
          System.import('containers/App')
            .then(loadModule(cb))
            .catch(errorHandler);
        }}
      />
      <Route
        path="/another"
        getComponent={(nextState, cb) => {
          // inject reducer and component asyncroniously;
          const importModules = Promise.all([
            System.import('containers/Another/reducer'),
            System.import('containers/Another'),
          ]);

          const renderModule = loadModule(cb);

          importModules.then(([reducer, component]) => {
            injectReducer('another', reducer.default);
            renderModule(component);
          });

          importModules.catch(errorHandler);
        }}
      />
    </Router>
  );
}
