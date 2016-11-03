import endpoints from 'configs/endpoints';
import api from 'utils/api';
import { updateLocalVehicles } from '../utils/vehicleHelpers';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';
export const FLEET_MODEL_SOCKET_SET_BATCH = 'portal/services/FLEET_MODEL_SOCKET_SET_BATCH';

export const openFleetSocket = () => _openFleetSocket;
export const closeFleetSocket = _closeSocket;
export const isSocketOpened = () => socketIsOpened;

let fleetSocket;
let socketIsOpened = false;

let batchQueue;
const BATCHING_TIME_MS = 2000;

function _openFleetSocket(dispatch, getState) {
  if (socketIsOpened) {
    return;
  }

  const { url } = endpoints.monitor;

  fleetSocket = api.invokeWebSocket(url);

  socketIsOpened = true;

  batchQueue = [];

  fleetSocket.onmessage = inEvent => onMessageBatchingWithTimer(inEvent, dispatch, getState);
}

function onMessageBatchingWithTimer(inEvent, dispatch, getState) {
  const data = JSON.parse(inEvent.data);
  if (batchQueue.length === 0) {
    window.setTimeout(() => {
      console.log(`dispatching BATCH ${batchQueue.length}`);

      const { updates, deadList, delayedList } = updateLocalVehicles(batchQueue, getState);

      dispatch(_updateStatusBatch2({
        updates,
        deadList,
        delayedList,
      }));

      batchQueue.length = 0;
    }, BATCHING_TIME_MS);
  }
  batchQueue = batchQueue.concat(data.status);
}

function _closeSocket() {
  if (socketIsOpened) {
    fleetSocket.close();
    socketIsOpened = false;
  }
}

const _updateStatusBatch2 = ({
  updates,
  deadList,
  delayedList,
}) => ({
  type: FLEET_MODEL_SOCKET_SET_BATCH,
  updates,
  deadList,
  delayedList,
});
