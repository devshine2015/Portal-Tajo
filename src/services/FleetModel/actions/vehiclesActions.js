import { api } from 'utils/api';
import { isMwa, isDemo } from 'configs';
import endpoints from 'configs/endpoints';
import { mwaFetchJobs } from 'services/MWA/actions';
import subFleetFilter from 'services/Dealer/subFleetFiltering';
import dealerSelectors from 'services/Dealer/selectors';
import filterProcessedList from '../utils/filtering';
import { getProcessedVehicles } from '../reducer';
import {
  makeLocalVehicles,
  imMakeLocalVehicle,
  sortVehicles,
  orderByResentHistory,
} from '../utils/vehicleHelpers';
import { demoVehicles, demoStatus } from './demoVehicles';

export const FLEET_MODEL_READY_SET = 'portal/services/FLEET_MODEL_READY_SET';
export const FLEET_MODEL_VEHICLES_SET = 'portal/services/FLEET_MODEL_VEHICLES_SET';
export const FLEET_MODEL_VEHICLES_FILTER = 'portal/services/FLEET_MODEL_VEHICLES_FILTER';
export const FLEET_MODEL_VEHICLE_UPDATE = 'portal/services/FLEET_MODEL_VEHICLE_UPDATE';
export const FLEET_MODEL_VEHICLE_BATCH_UPDATE = 'vehBatchUpdate';
export const FLEET_MODEL_VEHICLES_UPDATE_LIST = 'portal/services/FLEET_MODEL_VEHICLES_UPDATE_LIST';
export const FLEET_MODEL_VEHICLE_SELECT = 'portal/services/FLEET_MODEL_VEHICLE_SELECT';
export const FLEET_MODEL_VEHICLE_ADD = 'portal/services/FLEET_MODEL_VEHICLE_ADD';
export const FLEET_MODEL_VEHICLE_DISABLE = 'portal/services/FLEET_MODEL_VEHICLE_DISABLE';
export const FLEET_MODEL_ORDER_UPDATE = 'portal/services/FLEET_MODEL_ORDER_UPDATE';
export const FLEET_MODEL_DETACH_DEVICE = 'portal/services/FLEET_MODEL_DETACH_DEVICE';
export const FLEET_MODEL_ATTACH_DEVICE = 'portal/services/FLEET_MODEL_ATTACH_DEVICE';

// variables for vehicle service history
export const VEHICLE_SERVICE_HISTORY_ADD = 'VEHICLE_SERVICE_HISTORY_ADD';
export const VEHICLE_SERVICE_HISTORY_SET = 'VEHICLE_SERVICE_HISTORY_SET';
export const VEHICLE_SERVICE_HISTORY_UPDATE = 'VEHICLE_SERVICE_HISTORY_UPDATE';


export const updateDetails = (details = {}) => dispatch =>
  makeUpdateVehicleRequest(details, dispatch);
export const updateLocalDetails = (vehicleId, newDetails) => dispatch =>
  _updateLocalVehicleModel(vehicleId, newDetails, dispatch);
export const updateLocalDetailsBatch = updates => dispatch =>
  dispatch(_vehicleBatchUpdate(updates));

export const filterVehicles = searchString => (dispatch, getState) =>
  _filterVehicles({ searchString }, dispatch, getState);
export const addVehicle = vehicle => (dispatch, getState) =>
  _addVehicle(vehicle, dispatch, getState);
export const setSelectedVehicleId = id => ({
  type: FLEET_MODEL_VEHICLE_SELECT,
  id,
});

export const fetchVehicles = getState => (dispatch) => {
  // if demo portal we use fake set of vehicles
  if (isDemo) {
    console.log('!!! isDemo ', isDemo);
    dispatch(fleetIsReady(true));
    const localObjects = makeLocalVehicles(
      subFleetFilter(demoVehicles, dealerSelectors.getSelectedSubFleet(getState())), demoStatus);
    dispatch(_vehiclesSet(localObjects));
    return Promise.resolve({ ready: true });
  }

  const urls = [{
    ...endpoints.getVehicles,
  }, {
    ...endpoints.getStats,
  }];
  dispatch(fleetIsReady(false));

  return Promise.all(
    urls.map(({ url, method }) =>
      api[method](url).then(toJson),
    ),
  ).then(([vehicles = [], { status = [] } = {}]) => {
    const localObjects = makeLocalVehicles(
      subFleetFilter(vehicles, dealerSelectors.getSelectedSubFleet(getState())), status);
    dispatch(_vehiclesSet(localObjects));
  }).then(() => {
    if (isMwa) {
      dispatch(mwaFetchJobs());
    }

    return Promise.resolve({ ready: true });
  })
    .catch((e) => {
      console.error(e);
      dispatch(fleetIsReady(true));

      return Promise.reject({ ready: false });
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
 * update local client-calculated values for a vehicle
 * */
export function _updateLocalVehicleModel(vehicleId, newDetails, dispatch) {
  dispatch(_vehicleUpdate(newDetails, vehicleId));
}

/**
 * PUT new updated details to the server
 * */
export function makeUpdateVehicleRequest(details, dispatch) {
  const { url, method } = endpoints.updateVehicle(details.id);
  return api[method](url, {
    payload: details,
  }).then(() => {
    dispatch(_vehicleUpdate({
      original: details,
      marker: details.meta.marker,
      driverId: details.meta.driverId,
      dist: {
        total: details.odometer.value,
      },
    }, details.id));
    return Promise.resolve();
  }, error => Promise.reject(error));
}

export const updateLastServiceOdo = data => (dispatch) => {
  const { url, method } = endpoints.updateVehicle(data.id);
  return api[method](url, {
    payload: data.original,
  }).then(() => {
    dispatch(_vehicleUpdate({
      original: data.original,
      lastServiceOdo: data.odometerValue,
    },
    data.id));
    return Promise.resolve();
  }, error => Promise.reject(error));
};

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
* */
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

const _vehicleBatchUpdate = updates => ({
  type: FLEET_MODEL_VEHICLE_BATCH_UPDATE,
  updates,
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

export const fleetIsReady = isReady => ({
  type: FLEET_MODEL_READY_SET,
  isReady,
});

export const fetchServiceOdoHistory = vehicleId => (dispatch) => {
  const { url, method } = endpoints.getOdoServiceHistory(vehicleId);

  return api[method](url)
    .then(res => res.json())
    .then((data) => {
      const orderedHistory = orderByResentHistory(data);
      dispatch(setServiceOdoHistory(vehicleId, orderedHistory));
      return Promise.resolve();
    }, error => Promise.reject(error));
};

export const createServiceOdo = (vehicleId, odometer) => (dispatch) => {
  const { url, method } = endpoints.createOdoService(vehicleId);
  return api[method](url, {
    payload: odometer,
  }).then(res => res.json())
    .then((data) => {
      dispatch(addServiceOdo(vehicleId, data));
      return Promise.resolve();
    }, error => Promise.reject(error));
};

export const setServiceOdoHistory = (vehicleId, serviceHistory) => ({
  type: VEHICLE_SERVICE_HISTORY_SET,
  vehicleId,
  serviceHistory,
});

export const addServiceOdo = (vehicleId, odometer) => ({
  type: VEHICLE_SERVICE_HISTORY_ADD,
  vehicleId,
  odometer,
});
