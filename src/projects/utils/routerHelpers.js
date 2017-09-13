import { syncHistoryWithStore } from 'react-router-redux';

// load module only if it is necessary
// see https://blog.mxstbr.com/2016/01/react-apps-with-pages/
// for details
export const loadModule = (cb) => (componentModule) => {
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

export const selectLocationState = () => {
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

export function getHistory(store, history) {
  return syncHistoryWithStore(history, store, {
    selectLocationState: selectLocationState(),
  });
}
