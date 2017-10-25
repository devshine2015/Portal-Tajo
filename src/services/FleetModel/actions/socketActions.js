import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { updateLocalVehicles } from '../utils/vehicleHelpers';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';
export const FLEET_MODEL_SOCKET_SET_BATCH = 'portal/services/FLEET_MODEL_SOCKET_SET_BATCH';

let fleetSocket;
let batchQueue;
const BATCHING_TIME_MS = 2000;

export const openFleetSocket = () => _openFleetSocket;
export const closeFleetSocket = _closeSocket;
export const isSocketOpened = () => {
  return fleetSocket && fleetSocket.readyState !== window.WebSocket.CLOSED;
};

function _openFleetSocket(dispatch, getState) {
  if (isSocketOpened()) {
    return;
  }

  const { url } = endpoints.monitor;

  fleetSocket = api.invokeWebSocket(url);

  batchQueue = [];
  fleetSocket.onmessage = inEvent => onMessageBatchingWithTimer(inEvent, dispatch, getState);
}

function onMessageBatchingWithTimer(inEvent, dispatch, getState) {
  const data = JSON.parse(inEvent.data);
  if (batchQueue.length === 0) {
    window.setTimeout(() => {
      // const t0 = performance.now();
      const { updates, deadList, delayedList } = updateLocalVehicles(batchQueue, getState);

      dispatch(_updateStatusBatch({
        updates,
        deadList,
        delayedList,
      }));

      // console.log('dispatching BATCH '+batchQueue.length+' in: '+(performance.now() - t0).toFixed(2));
      batchQueue.length = 0;
    }, BATCHING_TIME_MS);
  }
  batchQueue = batchQueue.concat(data.status);
}

export const reopenFleetSocket = () => (dispatch, getState) => {
  _closeSocket();
  _openFleetSocket(dispatch, getState);
};

function _closeSocket() {
  if (isSocketOpened()) {
    fleetSocket.close();
  }
}

const _updateStatusBatch = ({
  updates,
  deadList,
  delayedList,
}) => ({
  type: FLEET_MODEL_SOCKET_SET_BATCH,
  updates,
  deadList,
  delayedList,
});
