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
import gfEditorReducer from 'containers/GFEditor/reducer';
import mapViewReducer from 'containers/MapFleet/reducerAction';
import sessionReducer from 'services/Session/reducer';
import globalReducer from 'services/Global/reducer';
import usersReducer from 'services/Users/reducer';
import devicesReducer from 'services/Devices/reducer';
import alertsSystemReducer from 'services/AlertsSystem/reducer';

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
    session: sessionReducer,
    global: globalReducer,
    route: routerReducer,
    inner: innerPortalReducer,
    snackbar: snackbarReducer,
    fleet: fleetReducer,
    chronicle: chronicleReducer,
    usersManager: usersReducer,
    gfEditor: gfEditorReducer,
    mapView: mapViewReducer,
    devices: devicesReducer,
    alerts: alertsSystemReducer,
    ...asyncReducers,
  });
}

export const createSelfServiceReducer = (asyncReducers) =>
  combineReducers({
    session: sessionReducer,
    global: globalReducer,
    fleet: fleetReducer,
    reports: reportReducer,
    user: userReducer,
    ...asyncReducers,
  });
