import qs from 'query-string';
import { getFleetName } from 'services/Global/reducer';
import { socket } from 'utils/api';
import { getAuthenticationSession } from 'services/Auth/reducer';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';

export const openFleetSocket = (fleet = undefined) => (dispatch, getState) =>
  _openFleetSocket(fleet, dispatch, getState);
export const closeFleetSocket = () => _closeSocket;

let fleetSocket;
let socketIsOpened = false;

/**
 * fleetName is optional
 **/
function _openFleetSocket(fleetName, dispatch, getState) {
  const fleet = fleetName || getFleetName(getState());
  const url = `${fleet}/status/monitor`;
  const params = {
    ['DRVR-SESSION']: getAuthenticationSession(getState()),
  };

  fleetSocket = socket(url, qs.stringify(params));

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
