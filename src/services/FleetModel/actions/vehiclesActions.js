import { api } from 'utils/api';
import { isMwa } from 'configs';
import endpoints from 'configs/endpoints';
import { mwaFetchJobs } from 'services/MWA/actions';
import filterProcessedList from '../utils/filtering';
import { getProcessedVehicles } from '../reducer';
import {
  makeLocalVehicles,
  imMakeLocalVehicle,
  sortVehicles,
} from '../utils/vehicleHelpers';

export const FLEET_MODEL_READY_SET = 'portal/services/FLEET_MODEL_READY_SET';
export const FLEET_MODEL_VEHICLES_SET = 'portal/services/FLEET_MODEL_VEHICLES_SET';
export const FLEET_MODEL_VEHICLES_FILTER = 'portal/services/FLEET_MODEL_VEHICLES_FILTER';
export const FLEET_MODEL_VEHICLE_UPDATE = 'portal/services/FLEET_MODEL_VEHICLE_UPDATE';
export const FLEET_MODEL_VEHICLES_UPDATE_LIST = 'portal/services/FLEET_MODEL_VEHICLES_UPDATE_LIST';
export const FLEET_MODEL_VEHICLE_SELECT = 'portal/services/FLEET_MODEL_VEHICLE_SELECT';
export const FLEET_MODEL_VEHICLE_ADD = 'portal/services/FLEET_MODEL_VEHICLE_ADD';
export const FLEET_MODEL_VEHICLE_DISABLE = 'portal/services/FLEET_MODEL_VEHICLE_DISABLE';
export const FLEET_MODEL_ORDER_UPDATE = 'portal/services/FLEET_MODEL_ORDER_UPDATE';
export const FLEET_MODEL_DETACH_DEVICE = 'portal/services/FLEET_MODEL_DETACH_DEVICE';
export const FLEET_MODEL_ATTACH_DEVICE = 'portal/services/FLEET_MODEL_ATTACH_DEVICE';

export const updateDetails = (details = {}) => dispatch =>
  makeUpdateVehicleRequest(details, dispatch);
export const filterVehicles = searchString => (dispatch, getState) =>
  _filterVehicles({ searchString }, dispatch, getState);
export const addVehicle = vehicle => (dispatch, getState) =>
  _addVehicle(vehicle, dispatch, getState);
export const setSelectedVehicleId = id => ({
  type: FLEET_MODEL_VEHICLE_SELECT,
  id,
});

export const fetchVehicles = () => (dispatch) => {
  const urls = [{
    ...endpoints.getVehicles,
  }, {
    ...endpoints.getStats,
  }];

  dispatch(_fleetIsReady(false));

  return Promise.all(
    urls.map(({ url, method }) =>
      api[method](url).then(toJson),
    ),
  ).then(([vehicles = [], { status = [] } = {}]) => {
    const localObjects = makeLocalVehicles(vehicles, status);

    dispatch(_vehiclesSet(localObjects));
  }).then(() => {
    if (isMwa) {
      dispatch(mwaFetchJobs());
    }
  })
  .catch((e) => {
    dispatch(_fleetIsReady(true));
    console.error(e);
  });
};


function _filterVehicles({ searchString }, dispatch, getState) {
  const originVehicles = getProcessedVehicles(getState());
  const options = {
    searchString,
    objectsList: originVehicles,
    paths: ['original.name', 'original.licensePlate'],
  };
  const filteredVehicles = filterProcessedList(options);

  dispatch(_vehiclesFilterUpdate(filteredVehicles, searchString));
}

// inject new vehicle to:
// - fleet.vehicles.processedList
// resort vehicles and update
// - fleet.vehicles.orderedList
function _addVehicle(vehicle, dispatch, getState) {
  const imLocalVehicle = imMakeLocalVehicle(vehicle);
  const imVehiclesMap = getProcessedVehicles(getState());
  const nextVehiclesMap = imVehiclesMap.set(vehicle.id, imLocalVehicle);
  const orderedList = sortVehicles(nextVehiclesMap.toArray());

  dispatch({
    type: FLEET_MODEL_VEHICLE_ADD,
    localVehicle: imLocalVehicle,
    orderedList,
    id: vehicle.id,
  });
}

/**
 * PUT new updated details to the server
 **/
export function makeUpdateVehicleRequest(details, dispatch) {
  const { url, method } = endpoints.updateVehicle(details.id);

  return api[method](url, {
    payload: details,
  }).then(() => {
    dispatch(_vehicleUpdate({
      original: details,
      //
      marker: details.meta.marker,
      driverId: details.meta.driverId,

      dist: {
        total: details.odometer.value,
      },
    }, details.id));
    return Promise.resolve();
  }, error => Promise.reject(error));
}

export const disableVehicle = vehicleId => (dispatch) => {
  const { url, method } = endpoints.disableVehicle(vehicleId);

  return api[method](url)
    .then(() => {
      dispatch(_vehicleDisable(vehicleId));

      return Promise.resolve();
    }, error => Promise.reject(error));
};

/**
 * local update - local tick, recalculating time since last WS data,
 * delay/nonErporting states, estimated travel dist since last update, etc...
 *
 * commented out since not used anywhere
**/
// export function localUpdateVehicle(details, dispatch) {
//   dispatch(_vehicleUpdate({
//     original: details,
//   }, details.id));
// }

export const updateVehiclesList = vehicles => ({
  type: FLEET_MODEL_VEHICLES_UPDATE_LIST,
  vehicles,
});

function toJson(response) {
  return response.json();
}

const _vehiclesSet = ({
  deadList,
  delayedList,
  localVehicles,
  orderedVehicles,
}) => ({
  type: FLEET_MODEL_VEHICLES_SET,
  deadList,
  delayedList,
  localVehicles,
  orderedVehicles,
});

export const _vehicleUpdate = (details, id) => ({
  type: FLEET_MODEL_VEHICLE_UPDATE,
  details,
  id,
});

const _vehiclesFilterUpdate = (vehicles, searchString) => ({
  type: FLEET_MODEL_VEHICLES_FILTER,
  vehicles,
  searchString,
});

const _vehicleDisable = id => ({
  type: FLEET_MODEL_VEHICLE_DISABLE,
  id,
});

const _fleetIsReady = isReady => ({
  type: FLEET_MODEL_READY_SET,
  isReady,
});
