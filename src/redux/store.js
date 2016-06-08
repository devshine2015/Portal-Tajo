/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createReducer from './reducers';

const devtools = window.devToolsExtension || (() => noop => noop);
const isDev = process.env.NODE_ENV !== 'production';

export default function configureStore(initialState = {}, history) {
  const enhancers = [
    devtools(),
  ];

  const middlewares = [
    thunk,
    routerMiddleware(history),
  ];

  if (isDev) {
    const createLogger = require('redux-logger');
    const logger = createLogger({
      predicate: isDev,
      collapsed: true,
      duration: true,
    });
    middlewares.push(logger);
  }

  const createAppStore = applyMiddleware(...middlewares)(createStore);
  const store = createAppStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Extensions
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
