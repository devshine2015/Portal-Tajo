import api from 'utils/api';
import {
  getFleetName,
  getAuthenticationSession,
} from 'containers/App/reducer';

export const FLEET_MODEL_VEHICLES_SET = 'portal/services/FLEET_MODEL_VEHICLES_SET';

export const fetchVehicles = (fleet = undefined) => (dispatch, getState) =>
  _fetchVehicles(dispatch, getState, fleet);

/**
 * fleet is optional
 **/
function _fetchVehicles(dispatch, getState, fleetName = undefined) {
  const fleet = fleetName || getFleetName(getState());
  const url = `${fleet}/vehicles`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  return api(url, { optionalHeaders })
    .then(toJson)
    .then(vehicles => {
      dispatch(_vehiclesSet(vehicles));
    });
}

function toJson(response) {
  return response.json();
}

const _vehiclesSet = (vehicles) => ({
  type: FLEET_MODEL_VEHICLES_SET,
  vehicles,
});
