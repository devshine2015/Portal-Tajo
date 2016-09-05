/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import snackbarReducer from 'containers/Snackbar/reducer';
import innerPortalReducer from 'containers/InnerPortal/reducer';
import fleetReducer from 'services/FleetModel/reducer';
import reportReducer from 'containers/Report/reducer';
import chronicleReducer from 'containers/Chronicle/reducer';
import authReducer from 'services/Auth/reducer';
import globalReducer from 'services/Global/reducer';
import userReducer from 'services/UserModel/reducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routerReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    auth: authReducer,
    global: globalReducer,
    route: routerReducer,
    inner: innerPortalReducer,
    snackbar: snackbarReducer,
    fleet: fleetReducer,
    chronicle: chronicleReducer,
    user: userReducer,
    ...asyncReducers,
  });
}

export const createSelfServiceReducer = (asyncReducers) =>
  combineReducers({
    global: globalReducer,
    fleet: fleetReducer,
    reports: reportReducer,
    ...asyncReducers,
  });
