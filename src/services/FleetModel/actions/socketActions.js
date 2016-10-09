import endpoints from 'configs/endpoints';
import api from 'utils/api';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';
export const FLEET_MODEL_SOCKET_SET_BATCH = 'portal/services/FLEET_MODEL_SOCKET_SET_BATCH';

export const openFleetSocket = () => _openFleetSocket;
export const closeFleetSocket = _closeSocket;
export const isSocketOpened = () => socketIsOpened;

let fleetSocket;
let socketIsOpened = false;

let batchQueue;
let batchLastTime;
const BATCHING_TIME_MS = 2000;

/**
 * fleetName is optional
 **/
function _openFleetSocket(dispatch) {
  if (socketIsOpened) {
    console.warn('!!>> TRYING to open already opened WS!!');
    //     _closeSocket();
    return;
  }

  const { url } = endpoints.monitor;

  fleetSocket = api.invokeWebSocket(url);

  socketIsOpened = true;

  batchQueue = [];
  batchLastTime = Date.now();

  // fleetSocket.onmessage = inEvent => onMessage(inEvent, dispatch);
  fleetSocket.onmessage = inEvent => onMessageBatching(inEvent, dispatch);
}

function onMessage(inEvent, dispatch) {
  const data = JSON.parse(inEvent.data);
console.log("socketSz "+data.status.length);
  dispatch(_updateStatusBatch(data.status));
  // if (data.status.length === 1) {
  //   dispatch(_updateStatus(data.status[0]));
  // } else {
  //   data.status.forEach((inSt) => {dispatch(_updateStatus(inSt));});
  // }
}

function onMessageBatching(inEvent, dispatch) {
  const data = JSON.parse(inEvent.data);
  batchQueue = batchQueue.concat(data.status);
//  console.log("socketSz "+data.status.length);

  const nowTime = Date.now();
  if (nowTime - batchLastTime > BATCHING_TIME_MS) {
    console.log("dispatching BATCH "+batchQueue.length);
    dispatch(_updateStatusBatch(batchQueue));
    batchQueue.length = 0;
    batchLastTime = nowTime;
  }
}


function _closeSocket() {
  if (socketIsOpened) {
    fleetSocket.close();
    socketIsOpened = false;
  }
}

const _updateStatus = (statusObj) => ({
  type: FLEET_MODEL_SOCKET_SET,
  statusObj,
});

const _updateStatusBatch = (statusBatch) => ({
  type: FLEET_MODEL_SOCKET_SET_BATCH,
  statusBatch,
});
