/**
 * Reducers for the Dealer portal
 */

import { combineReducers } from 'redux-immutable';
import innerPortalReducer from 'containers/InnerPortal/reducer';
import sessionReducer from 'services/Session/reducer';
import globalReducer from 'services/Global/reducer';
import snackbarReducer from 'containers/Snackbar/reducer';
import dealerReducer, { reducerKey as dealerReducerKey } from 'services/Dealer/reducer';
import fleetReducer from 'services/FleetModel/reducer';
// import fleetReducer, { reducerKey as fleetReducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
import usersManagerReducer, { reducerKey as usersManagerReducerKey } from 'services/Users/reducer';
import routerReducer from '../utils/routerReducer';
import alertsSystemReducer from 'services/AlertsSystem/reducer';
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
    // [fleetReducerKey]: fleetReducer,
    [dealerReducerKey]: dealerReducer,
    [usersManagerReducerKey]: usersManagerReducer,
    alerts: alertsSystemReducer,
    ...asyncReducers,
  });
}
