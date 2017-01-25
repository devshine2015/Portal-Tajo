import { Map } from 'immutable';
import { ZOMBIE_TIME_TRH_MIN, LAG_INDICAION_TRH_MIN } from 'utils/constants';
import { sortByName } from 'utils/sorting';
import {
  getProcessedVehicles,
  getDeadList,
  getDelayedList,
} from '../reducer';
import {
  removeMe_OverrideMaritimeDemoData,
  removeMe_OverrideMaritimeDemoVessel,
} from './maritimeDemoData';
import { vehicleClientUpdate } from './localTickHelpers';

function getNextState(itWas, itNow) {
  let itWill;

  if (itWas === itNow) itWill = undefined;
  else {
    itWill = itNow;
  }

  return itWill;
}

/**
 * create new immutable vehicle if imVehicle not defined,
 * will update given imVehicle in other case.
 *
 * returns immutable map
**/
function _makeImmutableVehicle({
  vehicleStats,
  now = Date.now(),
  imVehicle = new Map({}),
  initilalValues = undefined,
}) {
  // for maritime demoing
  // remove next string when maritime demo will be finished
  removeMe_OverrideMaritimeDemoData(vehicleStats);

  const sinceEpoch = new Date(vehicleStats.ts).getTime();
  const hasPosition = vehicleStats.hasOwnProperty('pos');
  const hasDist = vehicleStats.hasOwnProperty('dist');
  const hasTemp = vehicleStats.hasOwnProperty('temp');
  const isDead = !hasPosition;
  const ignitionOn = checkIgnition(vehicleStats);
  const localTimings = vehicleClientUpdate(imVehicle, now, ignitionOn);

  const imNextVehicle = imVehicle.withMutations(s => {
    s.set('isDead', isDead)
     .set('isDelayed', localTimings.isDelayed)
     .set('lastUpdateSinceEpoch', sinceEpoch)
     .set('ignitionOn', ignitionOn)
     .set('isDelayedWithIgnitionOff', localTimings.isDelayedWithIgnitionOff);

    if (hasTemp) {
      s.set('temp', vehicleStats.temp.temperature);
    } else {
      s.set('temp', undefined);
    }

    if (hasDist) {
      s.set('dist', vehicleStats.dist);
    } else {
      s.setIn(['dist', 'total'], 0)
       .setIn(['dist', 'lastTrip'], 0);
    }

    if (hasPosition) {
      s.set('pos', [vehicleStats.pos.latlon.lat, vehicleStats.pos.latlon.lng])
       .set('speed', vehicleStats.pos.speed);
    } else {
      s.set('pos', [0, 0])
       .set('speed', 0);
    }

    // initial values used after fetching
    // for converting backend data to local model
    if (initilalValues) {
      s.merge(initilalValues);
    }
  });

  // for maritime demoing.
  // remove next string when maritime demo will be finished
  return removeMe_OverrideMaritimeDemoVessel(imNextVehicle);

  // uncomment when maritime demo will be finished
  // return imNextVehicle;
}

const updateLocalVehicle = (imVehicle, vehicleStats, now) => {
  const imNextVehicle = _makeImmutableVehicle({ imVehicle, vehicleStats, now });

  const wasDead = imVehicle.get('isDead');
  const wasDelayed = imVehicle.get('isDelayed');

  const isDead = imNextVehicle.get('isDead');
  const isDelayed = imNextVehicle.get('isDelayed');

  const willDead = getNextState(wasDead, isDead);
  const willDelayed = getNextState(wasDelayed, isDelayed);

  return {
    imNextVehicle,
    willDead,
    willDelayed,
  };
};

function updateList(list, nextState = undefined, id) {
  if (nextState === undefined) return list;

  if (nextState) {
    // eslint-disable-next-line no-param-reassign
    list = list.push(id);
  } else {
    const index = list.indexOf(id);

    // eslint-disable-next-line no-param-reassign
    list = list.delete(index);
  }

  return list;
}

export function updateLocalVehicles(wsStatuses, getState) {
  const nextLocalVehicles = {};
  const processedList = getProcessedVehicles(getState());
  const now = Date.now();
  let deadList = getDeadList(getState());
  let delayedList = getDelayedList(getState());
  wsStatuses.forEach(status => {
    const localVehicle = processedList.get(status.id);
    const { imNextVehicle, willDead, willDelayed } = updateLocalVehicle(localVehicle, status, now);

    nextLocalVehicles[status.id] = imNextVehicle;

    deadList = updateList(deadList, willDead, status.id);
    delayedList = updateList(delayedList, willDelayed, status.id);
  });

  return {
    updates: new Map(nextLocalVehicles),
    deadList,
    delayedList,
  };
}

export function makeLocalVehicle(backEndObject = {}, vehicleStats = {}) {
  if (backEndObject.status !== 'active') {
    return null;
  }

  const initilalValues = {
    filteredOut: false,
    ignitionOn: 1,
    isDelayedWithIgnitionOff: false,
    isDelayed: false,
    timeSinceUpdateMin: 1,
    estimatedTravelKm: 10,
  };

  // for some vehicles kind is not defined
  if (!backEndObject.hasOwnProperty('kind')) {
    // eslint-disable-next-line no-param-reassign
    backEndObject.kind = 'UNDEFINED';
  }

  const imVehicle = _makeImmutableVehicle({ vehicleStats, initilalValues });

  return imVehicle.set('original', backEndObject)
                  .set('id', backEndObject.id);
}

//
// delayed update? (comm coverage, expected to be ~45min)
export function checkLaggedVehicle(delayTimeMinutes) {
  return delayTimeMinutes > LAG_INDICAION_TRH_MIN
        && delayTimeMinutes < ZOMBIE_TIME_TRH_MIN;
}

function checkIgnition(status) {
  // ignitionOn values:  0- off; 1- on; 2- undefined
  // eslint-disable-next-line no-nested-ternary
  return status.ignOn !== undefined ? (status.ignOn ? 1 : 0) : 2;
}

export function makeLocalVehicles(backEndVehiclesList = [], statsList = []) {
  const localVehicles = {};
  const orderedVehicles = sortVehicles(backEndVehiclesList);
  const deadList = [];
  const delayedList = [];
  const now = Date.now();
let removeMe_counter = 0;
  backEndVehiclesList.forEach((aVehicle) => {
    const vehicleStats = getVehicleById(aVehicle.id, statsList).vehicle;
    const imLocalVehicle = makeLocalVehicle(aVehicle, vehicleStats, now);

    if (imLocalVehicle) {
      localVehicles[aVehicle.id] = imLocalVehicle;

      if (imLocalVehicle.get('isDead')) {
        deadList.push(aVehicle.id);
      }

      if (imLocalVehicle.get('isDelayed')) {
        delayedList.push(aVehicle.id);
      }
    }
  });

  return {
    localVehicles,
    orderedVehicles,
    deadList,
    delayedList,
  };
}

/**
 * accept POJO (i.e. backEndVehiclesList)
 * or immutable List of immutable Map
 * each element MUST HAVE 'name' or 'original.name' property.
 *
 * returns array of ids of sorted elements
**/
export function sortVehicles(vehicles = []) {
  return vehicles
    .sort((a, b) => {
      if (Map.isMap(a)) a = a.toJS(); // eslint-disable-line no-param-reassign
      if (Map.isMap(b)) b = b.toJS(); // eslint-disable-line no-param-reassign

      if (a.hasOwnProperty('original')) {
        return sortByName(a.original, b.original);
      }

      return sortByName(a, b);
    })
    .map(obj => {
      if (Map.isMap(obj)) {
        return obj.get('id');
      }

      return obj.id;
    });
}

export function mockBackendVehicle(data) {
  const odo = data.isMiles ? data.odometer * 1.60934 : data.odometer;

  return {
    created: Date.now(),
    licensePlate: data.license,
    make: '',
    model: '',
    name: data.name,
    status: 'active',
    year: '',
    odometer: {
      // backend can accept only integers here, i.e. km.
      value: parseInt(odo, 10),
    },
  };
}

export function cleanVehicle(vehicle) {
  const requiredBackEndProps = [
    'id', 'name', 'licensePlate', 'make', 'model', 'kind',
    'odometer', 'year', 'created', 'updated', 'deviceId',
    'status',
  ];

  const result = {};

  requiredBackEndProps.forEach(reqProp => {
    result[reqProp] = vehicle[reqProp];
  });

  return result;
}

/**
 * Find vehicle by id and return its instance and index
 **/
export function getVehicleById(id, array = []) {
  let vehicleIndex;
  let vehicle;

  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      vehicleIndex = i;
      vehicle = array[i];
      break;
    }
  }

  return {
    vehicle,
    vehicleIndex,
  };
}
