/**
 * Inject an asynchronously loaded reducer
 */
function injectAsyncReducer(store, createReducer) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Helper for creating injectors
 */
export default function getHooks(store, createReducer) {
  return {
    injectReducer: injectAsyncReducer(store, createReducer),
  };
}
