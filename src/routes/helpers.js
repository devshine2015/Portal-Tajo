// load module only if it is necessary
// see https://blog.mxstbr.com/2016/01/react-apps-with-pages/
// for details
export const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export function errorHandler(error) {
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
