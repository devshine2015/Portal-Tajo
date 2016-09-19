import api from 'utils/api';
import { openFleetSocket } from './socketActions';
import { getFleetName } from 'services/Global/reducer';
import { getAuthenticationSession } from 'services/Auth/reducer';
import { makeLocalVehicles } from '../utils/vehicleHelpers';
import { filterProcessedListByName } from '../utils/filtering';
import { getProcessedVehicles } from '../reducer';

export const FLEET_MODEL_VEHICLES_SET = 'portal/services/FLEET_MODEL_VEHICLES_SET';
export const FLEET_MODEL_VEHICLES_FILTER = 'portal/services/FLEET_MODEL_VEHICLES_FILTER';
export const FLEET_MODEL_VEHICLE_UPDATE = 'portal/services/FLEET_MODEL_VEHICLE_UPDATE';

export const fetchVehicles = (fleet, openWebSocket) => (dispatch, getState) =>
  _fetchVehicles(fleet, openWebSocket, dispatch, getState);
export const updateDetails = (details = {}) => (dispatch, getState) =>
  makeUpdateVehicleRequest(details, dispatch, getState);
export const filterVehicles = (searchString) => (dispatch, getState) =>
  _filterVehicles({ searchString }, dispatch, getState);

/**
 * fleet is optional
 **/
function _fetchVehicles(fleetName, openWebSocket, dispatch, getState) {
  const fleet = fleetName || getFleetName(getState());
  const urls = [`${fleet}/vehicles`, `${fleet}/status`];
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  return Promise.all(
    urls.map(url =>
      api(url, { optionalHeaders }).then(toJson)
    )
  ).then(([vehicles = [], { status } = {}]) => {
    const { localVehicles, orderedVehicles } = makeLocalVehicles(vehicles, status);
    dispatch(_vehiclesSet(vehicles, localVehicles, orderedVehicles));

    if (openWebSocket) {
      dispatch(openFleetSocket(fleet));
    }
  })
  .catch(e => {
    console.error(e);
  });
}


function _filterVehicles({ searchString }, dispatch, getState) {
  const originVehicles = getProcessedVehicles(getState()).toJS();
  const filteredVehicles = filterProcessedListByName(originVehicles, searchString);

  dispatch(_vehiclesFilterUpdate(filteredVehicles));
}

/**
 * PUT new updated details to the server
 **/
export function makeUpdateVehicleRequest(details, dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/vehicles/${details.id}`;
  const optionalHeaders = {
    ['DRVR-SESSION']: getAuthenticationSession(getState()),
  };

  return api.put(url, {
    optionalHeaders,
    payload: details,
  }).then(() => {
    dispatch(_vehicleUpdate(details, details.id));
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

const _vehiclesSet = (vehicles, localVehicles, orderedVehicles) => ({
  type: FLEET_MODEL_VEHICLES_SET,
  vehicles,
  localVehicles,
  orderedVehicles,
});

const _vehicleUpdate = (details, id) => ({
  type: FLEET_MODEL_VEHICLE_UPDATE,
  details,
  id,
});

const _vehiclesFilterUpdate = (vehicles) => ({
  type: FLEET_MODEL_VEHICLES_FILTER,
  vehicles,
});
