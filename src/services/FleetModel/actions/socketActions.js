import endpoints from 'configs/endpoints';
import api from 'utils/api';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';

export const openFleetSocket = () => _openFleetSocket;
export const closeFleetSocket = _closeSocket;
export const isSocketOpened = () => socketIsOpened;

let fleetSocket;
let socketIsOpened = false;

/**
 * fleetName is optional
 **/
function _openFleetSocket(dispatch) {
  if (socketIsOpened) {
    console.warn('!!>> TRYING to open already opened WS!!');
    _closeSocket();
  }
  const { url } = endpoints.monitor;

  fleetSocket = api.invokeWebSocket(url);

  socketIsOpened = true;

  fleetSocket.onmessage = inEvent => onMessage(inEvent, dispatch);
}

function onMessage(inEvent, dispatch) {
  const data = JSON.parse(inEvent.data);

  if (data.status.lengh === 1) {
    dispatch(_updateStatus(data.status[0]));
  } else {
    data.status.forEach((inSt) => {dispatch(_updateStatus(inSt));});
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
