import { localTick } from '../utils/localTickHelpers';
import { isMaritime } from 'configs';

export const startLocalTick = () => _startLocalTick;
export const stopLocalTick = () => _stopLocalTick;

// update once a minute or so
const LOCAL_TICK_INTERVAL_MS = 1000 * 60;

let localTickProcId = null;

function _startLocalTick(dispatch, getState) {
  // if (!isMaritime) {
  //   return;
  // }
  if (localTickProcId !== null) {
    return;
  }
  // do the first tick right away - so we are actual
  localTick(dispatch, getState);
  localTickProcId = window.setInterval(() => {
    localTick(dispatch, getState);
  }, LOCAL_TICK_INTERVAL_MS);
}

function _stopLocalTick() {
  if (localTickProcId === null) {
    return;
  }
  window.clearInterval(localTickProcId);
  localTickProcId = null;
}
