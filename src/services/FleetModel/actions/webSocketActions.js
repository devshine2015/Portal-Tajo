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
  const url = `${fleet}/location`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  const fleetSocket = new WebSocket('ws://ddsdev.cloudapp.net:8080/engine/test/status/monitor');
  fleetSocket.onmessage = (inEvent) => {
    const data = JSON.parse(inEvent.data);
    dispatch(_updateStatus(data.status[0]));
  };
  // return api(url, { optionalHeaders })
  //   .then(toJson)
  //   .then(locations => {
  //     dispatch(_locationsSet(locations));
  //   });
}

const _updateStatus = (statusObj) => ({
  type: 'asdf', // FLEET_MODEL_SOCKET_SET,
  statusObj,
});
