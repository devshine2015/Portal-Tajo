import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// load module only if it is necessary
// see https://blog.mxstbr.com/2016/01/react-apps-with-pages/
// for details
function loadModule(module, callback) {
  require.ensure([], () => {
    callback(null, module);
  });
}

export default (
  <Router history={browserHistory}>
    <Route
      path="/"
      getComponent={(location, callback) => loadModule(require('./containers/App'), callback)}
    />
    <Route
      path="/another"
      getComponent={(location, callback) => loadModule(require('./containers/Another'), callback)}
    />
  </Router>
);
