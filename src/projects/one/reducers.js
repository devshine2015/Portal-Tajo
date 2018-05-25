/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import snackbarReducer from 'containers/Snackbar/reducer';
import innerPortalReducer from 'containers/InnerPortal/components/OnePortal/reducer';
import fleetReducer from 'services/FleetModel/reducer';
import chronicleReducer from 'screens/DemoChronicle/reducer';
import gfEditorReducer from 'containers/GFEditor/reducer';
import mapStateReducer from 'containers/Map/reducerAction';
import sessionReducer from 'services/Session/reducer';
import globalReducer from 'services/Global/reducer';
import usersManagerReducer, { reducerKey as usersManagerReducerKey } from 'services/Users/reducer';
import dealerReducer, { reducerKey as dealerReducerKey } from 'services/Dealer/reducer';
import devicesReducer from 'services/Devices/reducer';
import alertsSystemReducer from 'services/AlertsSystem/reducer';
import execReportsReducer from 'screens/ExecReports/services/reducer';
import mwaReducer from 'services/MWA/reducer';
import fleetReportReducer from 'services/FleetReport/reducer';
import routerReducer from '../utils/routerReducer';

import fuelUsageReducer from '../../screens/OneFuelUsage/services/reducer';

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
    fleetReport: fleetReportReducer,
    fuelUsage: fuelUsageReducer,
    chronicle: chronicleReducer,
    [usersManagerReducerKey]: usersManagerReducer,
    [dealerReducerKey]: dealerReducer,
    gfEditor: gfEditorReducer,
    mapState: mapStateReducer,
    devices: devicesReducer,
    alerts: alertsSystemReducer,
    execReports: execReportsReducer,
    mwa: mwaReducer,
    ...asyncReducers,
  });
}
