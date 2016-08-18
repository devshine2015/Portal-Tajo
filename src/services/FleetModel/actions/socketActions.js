import { getFleetName } from 'containers/App/reducer';
import { isSecure } from 'configs';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';

export const openFleetSocket = (fleet = undefined) => (dispatch, getState) =>
  _openFleetSocket(dispatch, getState, fleet);

/**
 * fleet is optional
 **/
function _openFleetSocket(dispatch, getState, fleetName = undefined) {
  const fleet = fleetName || getFleetName(getState());
  const socketProtocol = isSecure ? 'wss' : 'ws';
  const hostname = 'ddsdev.cloudapp.net:8080';
  const socketURL = `${socketProtocol}://${hostname}/engine/${fleet}/status/monitor`;
  const fleetSocket = new WebSocket(socketURL);

  fleetSocket.onmessage = (inEvent) => {
    const data = JSON.parse(inEvent.data);
    if (data.status.lengh === 1) {
      dispatch(_updateStatus(data.status[0]));
    } else {
      data.status.forEach((inSt) => {dispatch(_updateStatus(inSt));});
    }
  };
}

const _updateStatus = (statusObj) => ({
  type: FLEET_MODEL_SOCKET_SET,
  statusObj,
});
