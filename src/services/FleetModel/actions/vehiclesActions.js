import apiNext from 'utils/api.next';
import endpoints from 'configs/endpoints';
import { openFleetSocket } from './socketActions';
import { makeLocalVehicles } from '../utils/vehicleHelpers';
import { filterProcessedListByName } from '../utils/filtering';
import { getProcessedVehicles } from '../reducer';

export const FLEET_MODEL_VEHICLES_SET = 'portal/services/FLEET_MODEL_VEHICLES_SET';
export const FLEET_MODEL_VEHICLES_FILTER = 'portal/services/FLEET_MODEL_VEHICLES_FILTER';
export const FLEET_MODEL_VEHICLE_UPDATE = 'portal/services/FLEET_MODEL_VEHICLE_UPDATE';
export const FLEET_MODEL_VEHICLE_SELECT = 'portal/services/FLEET_MODEL_VEHICLE_SELECT';

export const fetchVehicles = openWebSocket => dispatch =>
  _fetchVehicles(openWebSocket, dispatch);
export const updateDetails = (details = {}) => dispatch =>
  makeUpdateVehicleRequest(details, dispatch);
export const filterVehicles = (searchString) => (dispatch, getState) =>
  _filterVehicles({ searchString }, dispatch, getState);
export const setSelectedVehicleId = (id) => (dispatch) =>
  dispatch(_vehicleSetSelect(id));

/**
 * fleet is optional
 **/
function _fetchVehicles(openWebSocket, dispatch) {
  const urls = [{
    ...endpoints.getVehicles,
  }, {
    ...endpoints.getStats,
  }];

  return Promise.all(
    urls.map(({ url, method }) =>
      apiNext[method](url).then(toJson)
    )
  ).then(([vehicles = [], { status } = {}]) => {
    const { localVehicles, orderedVehicles } = makeLocalVehicles(vehicles, status);
    dispatch(_vehiclesSet(vehicles, localVehicles, orderedVehicles));

    if (openWebSocket) {
      dispatch(openFleetSocket());
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
export function makeUpdateVehicleRequest(details, dispatch) {
  const { url, method } = endpoints.updateVehicle(details.id);

  return apiNext[method](url, {
    payload: details,
  }).then(() => {
    dispatch(_vehicleUpdate({
      ...details, dist: {
        total: details.odometer.value * 1000,
      },
    }, details.id));
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

const _vehicleSetSelect = (id) => ({
  type: FLEET_MODEL_VEHICLE_SELECT,
  id,
});
