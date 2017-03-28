import { vehiclesActions } from 'services/FleetModel/actions';
import { localTick } from '../utils/localTickHelpers';
// import { isMaritime } from 'configs';

export const startLocalTick = () => _startLocalTick;
export const stopLocalTick = () => _stopLocalTick;

// update once a minute or so
const LOCAL_TICK_INTERVAL_MS = 1000 * 60;

let localTickProcId = null;

const _performUpdates = (dispatch, getState) => () => {
  const imUpdatedProcessedList = localTick(getState);

  dispatch(vehiclesActions.updateVehiclesList(imUpdatedProcessedList));
};

function _startLocalTick(dispatch, getState) {
  // if (!isMaritime) {
  //   return;
  // }
  if (localTickProcId !== null) {
    return;
  }
  // do the first tick right away - so we are actual
  _performUpdates(dispatch, getState)();

  localTickProcId = window.setInterval(_performUpdates(dispatch, getState), LOCAL_TICK_INTERVAL_MS);
}

function _stopLocalTick() {
  if (localTickProcId === null) {
    return;
  }
  window.clearInterval(localTickProcId);
  localTickProcId = null;
}
