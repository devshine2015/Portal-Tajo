import { Map } from 'immutable';
import { LAG_INDICAION_TRH_MIN } from 'utils/constants';
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

const isTest = process.env.NODE_ENV === 'test';

// function _getNextState(itWas, itNow) {
//   let itWill;

//   if (itWas === itNow) itWill = undefined;
//   else {
//     itWill = itNow;
//   }

//   return itWill;
// }

function _checkIsDead(hasPosition = false) {
  return !hasPosition;
}

export function calcDeltaTimeMin(now, pastTimestamp) {
  return (now - pastTimestamp) / 1000 / 60;
}

export function checkIsDelayed(now, pastTimestamp) {
  const deltaTimeMin = calcDeltaTimeMin(now, pastTimestamp);

  return checkLaggedVehicle(deltaTimeMin);
}

export function getActivityStatus(isDead, isDelayed) {
  if (isDead) return 'dead';

  if (isDelayed) return 'delayed';

  return 'ok';
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
}) {
  // for maritime demoing
  // remove next string when maritime demo will be finished
  removeMe_OverrideMaritimeDemoData(vehicleStats);

  const sinceEpoch = new Date(vehicleStats.ts).getTime();
  const hasPosition = vehicleStats.hasOwnProperty('pos');
  const hasDist = vehicleStats.hasOwnProperty('dist');
  const hasTemp = vehicleStats.hasOwnProperty('temp');

  const isDead = _checkIsDead(hasPosition);
  // vehicle cannot be dead and delayed at same time
  // so it's already dead than it cannot be delayed
  const isDelayed = isDead ? false : checkIsDelayed(now, sinceEpoch);
  const activityStatus = getActivityStatus(isDead, isDelayed);

  const ignitionOn = checkIgnition(vehicleStats.ignOn);
  const localTimings = vehicleClientUpdate({
    imVehicle, now, ignitionOn,
  });

  const imNextVehicle = imVehicle.withMutations(s => {
    s.set('activityStatus', activityStatus)
     // .set('isDead', isDead)
     // .set('isDelayed', localTimings.isDelayed)
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
  });

  // for maritime demoing.
  // remove next string when maritime demo will be finished
  return removeMe_OverrideMaritimeDemoVessel(imNextVehicle);

  // uncomment when maritime demo will be finished
  // return imNextVehicle;
}

const _updateLocalVehicle = (imVehicle, vehicleStats, now) => {
  const imNextVehicle = _makeImmutableVehicle({ imVehicle, vehicleStats, now });

  const prevActivityStatus = imVehicle.get('activityStatus');
  // const wasDelayed = imVehicle.get('isDelayed');

  const nextActivityStatus = imNextVehicle.get('activityStatus');
  // const isDelayed = imNextVehicle.get('isDelayed');

  // const nextActivityStatus = _getNextState(prevActivityStatus, currentActivityStatus);
  // const willDead = _getNextState(prevActivityStatus, isDead);
  // const willDelayed = _getNextState(wasDelayed, isDelayed);

  return {
    imNextVehicle,
    prevActivityStatus,
    nextActivityStatus,
    // willDead,
    // willDelayed,
  };
};

function _removeFromList(imList, id) {
  const index = imList.indexOf(id);

  return imList.delete(index);
}

function _updateLists(prevStatus, nextStatus, id, getState) {
  const deadList = getDeadList(getState());
  const delayedList = getDelayedList(getState());

  if (nextStatus === prevStatus) {
    return {
      deadList,
      delayedList,
    };
  }

  let nextDeadList;
  let nextDelayedList;

  if (prevStatus === 'dead' && nextStatus === 'delayed') {
    nextDeadList = _removeFromList(deadList, id);

    nextDelayedList = delayedList.push(id);
  }

  if (prevStatus === 'delayed' && nextStatus === 'dead') {
    nextDelayedList = _removeFromList(delayedList, id);

    nextDelayedList = deadList.push(id);
  }

  if (prevStatus === 'dead' && nextStatus === 'ok') {
    nextDeadList = _removeFromList(deadList, id);
  }

  if (prevStatus === 'delayed' && nextStatus === 'ok') {
    nextDelayedList = _removeFromList(delayedList, id);
  }

  if (prevStatus === 'ok' && nextStatus === 'dead') {
    nextDeadList = deadList.push(id);
  }

  if (prevStatus === 'ok' && nextStatus === 'delayed') {
    nextDelayedList = delayedList.push(id);
  }

  return {
    delayedList: nextDelayedList,
    deadList: nextDeadList,
  };
}

export function updateLocalVehicles(wsStatuses, getState) {
  const nextLocalVehicles = {};
  const processedList = getProcessedVehicles(getState());
  const now = Date.now();
  let lists = {};

  wsStatuses.forEach(newStatus => {
    const localVehicle = processedList.get(newStatus.id);
    const {
      imNextVehicle,
      prevActivityStatus,
      nextActivityStatus,
    } = _updateLocalVehicle(localVehicle, newStatus, now);

    nextLocalVehicles[newStatus.id] = imNextVehicle;

    lists = _updateLists(prevActivityStatus, nextActivityStatus, newStatus.id, getState);
  });

  return {
    updates: new Map(nextLocalVehicles),
    ...lists,
  };
}

export function makeLocalVehicle(backEndObject = {}, vehicleStats = {}) {
  if (backEndObject.status !== 'active') {
    return null;
  }

  const initilalValues = new Map({
    filteredOut: false,
    timeSinceUpdateMin: 1,
    estimatedTravelKm: 10,
  });

  // for some vehicles kind is not defined
  if (!backEndObject.hasOwnProperty('kind')) {
    // eslint-disable-next-line no-param-reassign
    backEndObject.kind = 'UNDEFINED';
  }

  return initilalValues.withMutations(s => {
    s.merge(_makeImmutableVehicle({ vehicleStats }))
     .set('original', backEndObject)
     .set('id', backEndObject.id);
  });
}

//
// delayed update? (comm coverage, expected to be ~45min)
export function checkLaggedVehicle(delayTimeMinutes) {
  return delayTimeMinutes > LAG_INDICAION_TRH_MIN;
}

export function checkIgnition(ignOn) {
  // ignitionOn values:  0- off; 1- on; 2- undefined
  return ignOn !== undefined ? Number(ignOn) : 2;
}

export function makeLocalVehicles(backEndVehiclesList = [], statsList = []) {
  const localVehicles = {};
  const orderedVehicles = sortVehicles(backEndVehiclesList);
  const deadList = [];
  const delayedList = [];
  const now = Date.now();

  backEndVehiclesList.forEach((aVehicle) => {
    const vehicleStats = getVehicleById(aVehicle.id, statsList).vehicle;
    const imLocalVehicle = makeLocalVehicle(aVehicle, vehicleStats, now);

    if (imLocalVehicle) {
      localVehicles[aVehicle.id] = imLocalVehicle;
      const activityStatus = imLocalVehicle.get('activityStatus');

      if (activityStatus === 'dead') {
        deadList.push(aVehicle.id);
      }

      if (activityStatus === 'delayed') {
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

/**
 * return properties required by backend
 * in order to modify vehicle
 **/
export function mockRequiredBackendProps(data) {
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

export const _private = (() => {
  if (!isTest) return null;

  return {
    _makeImmutableVehicle,
    _checkIsDead,
  };
})();
