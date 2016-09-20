import endpoints from 'configs/endpoints';
import apiNext from 'utils/api.next';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';

export const openFleetSocket = () => _openFleetSocket;
export const closeFleetSocket = () => _closeSocket;

let fleetSocket;
let socketIsOpened = false;

/**
 * fleetName is optional
 **/
function _openFleetSocket(dispatch) {
  const { url } = endpoints.monitor;

  fleetSocket = apiNext.invokeWebSocket(url);

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
  }
}

const _updateStatus = (statusObj) => ({
  type: FLEET_MODEL_SOCKET_SET,
  statusObj,
});
