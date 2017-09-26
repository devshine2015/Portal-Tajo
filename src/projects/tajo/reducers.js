/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import snackbarReducer from 'containers/Snackbar/reducer';
import innerPortalReducer from 'containers/InnerPortal/reducer';
import fleetReducer from 'services/FleetModel/reducer';
import mapStateReducer from 'containers/Map/reducerAction';
import sessionReducer from 'services/Session/reducer';
import globalReducer from 'services/Global/reducer';
import usersManagerReducer, { reducerKey as usersManagerReducerKey } from 'services/Users/reducer';
import devicesReducer from 'services/Devices/reducer';
import alertsSystemReducer from 'services/AlertsSystem/reducer';
import routerReducer from '../utils/routerReducer';

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
    [usersManagerReducerKey]: usersManagerReducer,
    mapState: mapStateReducer,
    devices: devicesReducer,
    alerts: alertsSystemReducer,
    ...asyncReducers,
  });
}
