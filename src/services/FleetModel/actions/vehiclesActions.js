import api from 'utils/api';
import { openFleetSocket } from './socketActions';
import {
  getFleetName,
  getAuthenticationSession,
} from 'containers/App/reducer';
import processVehicels from '../utils/vehicleHelpers';

export const FLEET_MODEL_VEHICLES_SET = 'portal/services/FLEET_MODEL_VEHICLES_SET';
export const FLEET_MODEL_VEHICLE_UPDATE = 'portal/services/FLEET_MODEL_VEHICLE_UPDATE';

export const fetchVehicles = (fleet = undefined) => (dispatch, getState) =>
  _fetchVehicles(dispatch, getState, fleet);
export const updateDetails = (details = {}, index) => (dispatch, getState) =>
  makeUpdateVehicleRequest(details, index, dispatch, getState);

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
      // const vehiclesContainer = new DdcVehicleMaster();
      // vehicles.forEach((inVehicle) => {
      //   vehiclesContainer.add(inVehicle);
      // });
      const localHehicles = processVehicels(vehicles);
      dispatch(openFleetSocket(fleet));
      dispatch(_vehiclesSet(vehicles, localHehicles));
    });
}

/**
 * PUT new updated details to the server
 **/
export function makeUpdateVehicleRequest(details, index, dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/vehicles/${details.id}`;
  const optionalHeaders = {
    ['DRVR-SESSION']: getAuthenticationSession(getState()),
  };

  return api.put(url, {
    optionalHeaders,
    payload: details,
  }).then(() => {
    dispatch(_vehicleUpdate(details, index));
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

const _vehiclesSet = (vehicles, localVehicles) => ({
  type: FLEET_MODEL_VEHICLES_SET,
  vehicles,
  localVehicles,
});

const _vehicleUpdate = (details, index) => ({
  type: FLEET_MODEL_VEHICLE_UPDATE,
  details,
  index,
});
