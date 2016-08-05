import api from 'utils/api';
import {
  getFleetName,
  getAuthenticationSession,
} from 'containers/App/reducer';

export const FLEET_MODEL_SOCKET_SET = 'portal/services/FLEET_MODEL_SOCKET_SET';

export const openFleetSocket = (fleet = undefined) => (dispatch, getState) =>
  _openFleetSocket(dispatch, getState, fleet);

/**
 * fleet is optional
 **/
function _openFleetSocket(dispatch, getState, fleetName = undefined) {
  const fleet = fleetName || getFleetName(getState());
  const url = `${fleet}/status/monitor`;
//    const base = `${HOST_BASE}/${url}`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };
  // FIXME
  // TODO:
  // generate URL properly
  const socketURL = 'ws://ddsdev.cloudapp.net:8080/engine/test/status/monitor';
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
