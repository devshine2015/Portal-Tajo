import { syncHistoryWithStore } from 'react-router-redux';

/**
 * loads module only if it is necessary
 * @see https://blog.mxstbr.com/2016/01/react-apps-with-pages/
 */
const loadModule = cb => (componentModule) => {
  cb(null, componentModule.default);
};

export function errorHandler(error) {
  if (error === 'NotFound') {
    if (Object.hasOwnProperty.call(this, 'router')) {
      this.router.replace('/not-found');
    }

    return;
  }

  // eslint-disable-next-line
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

export function syncHistory(store, history) {
  return syncHistoryWithStore(history, store, {
    selectLocationState: selectLocationState(),
  });
}

/**
 * Closure provides the way to inject common properties later
 * @param {Function} dispatch - screens need to interact with store by dispatching events
 * @param {Function} injectReducer - sreens needs a way to inject reducers asyncroniously
 * @return {Function} actual screen creator
 */
export function makeScreenCreator(dispatch, injectReducer, auth) {
  /**
   * Make screen out of provided options and cretation function
   * @param {Function} routeCreator - actual function to run to create route
   * @param {Object} options - tweak each route
   * @param {Function} rule - by rule results we'll know if screen can be created
   * @return {Route} object which represent `route` in terms of `react-router`
   */
  return function ({ create, options, rule }) {
    // check if rule provided
    if (rule !== undefined && typeof rule === 'function' && !rule()) return null;

    const toInject = Object.assign({}, options, {
      auth,
      dispatch,
      injectReducer,
      errorHandler,
      loadModule,
    });

    return create(toInject);
  };
}
