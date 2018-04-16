/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import { api, auth0Api } from 'utils/api';
import { portal } from './index';


export default function configureStore(initialState = {}, history, createReducer) {
  const middleware = [
    thunk,
    routerMiddleware(history),
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState), // preloadedState
    composeWithDevTools(
      applyMiddleware(...middleware),
    ),
  );


  // Extensions
  store.asyncReducers = {}; // Async reducer registry
  // inject dispatch into errors handler
  api.injectStore(store);
  auth0Api.injectStore(store);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept(`../projects/${portal}/reducers`, () => {
      System.import(`../projects/${portal}/reducers`).then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
