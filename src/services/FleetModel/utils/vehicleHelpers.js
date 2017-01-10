// incoming backEnd vehicle obj:
//
// "id": "0691e788-72ac-4529-9308-e7a087d15f77",
// "name": "Land Cruiser (#LC7)",
// "licensePlate": "YGN 5J - 8987",
// "make": "Toyota",
// "model": "Landcruiser",
// "year": "2000",
// "created": "2015-12-17T15:18:03.760+0000",
// "updated": "2016-07-13T12:16:09.547+0000",
// "deviceId": "863286020885894",
// "status": "active"
// "kind":    //optional
import { Map } from 'immutable';
import { ZOMBIE_TIME_TRH_MS, LAG_INDICAION_TRH_MS } from 'utils/constants';
import { sortByName } from 'utils/sorting';
import {
  getProcessedVehicles,
  getDeadList,
  getDelayedList,
} from '../reducer';
import { overrideMaritimeDemoData,
  overrideMaritimeDemoVessel } from './maritimeDemoData';
import { vehiclesActions } from 'services/FleetModel/actions';

function getNextState(itWas, itNow) {
  let itWill;

  if (itWas === itNow) itWill = undefined;
  else {
    itWill = itNow;
  }

  return itWill;
}

const updateLocalVehicle = (vehicle, status, now) => {
  overrideMaritimeDemoData(status);
  const sinceEpoch = new Date(status.ts).getTime();
  const hasPosition = !!status.pos;
  const isDead = !hasPosition;
  const ignitionOn = checkIgnition(status);
  const isDelayedWithIgnitionOff = ignitionOn !== 1 && checkLaggedVehicle(now, sinceEpoch);
  const isDelayed = ignitionOn === 1 ? checkLaggedVehicle(now, sinceEpoch) : false;
  // const isDelayed = checkLaggedVehicle(now, sinceEpoch);
  const nextVehicle = vehicle.withMutations(s => {
    s.set('isDead', isDead)
     .set('isDelayed', isDelayed)
     .set('lastUpdateSinceEpoch', sinceEpoch)
     .set('ignitionOn', ignitionOn)
     .set('isDelayedWithIgnitionOff', isDelayedWithIgnitionOff);

    if (status.temp !== undefined) {
      s.set('temp', status.temp.temperature);
    }
    if (status.dist !== undefined) {
      s.set('dist', status.dist);
    }
    if (hasPosition) {
      s.set('pos', [status.pos.latlon.lat, status.pos.latlon.lng])
       .set('speed', status.pos.speed);
    }
  });

  const wasDead = vehicle.get('isDead');
  const wasDelayed = vehicle.get('isDelayed');

  const willDead = getNextState(wasDead, isDead);
  const willDelayed = getNextState(wasDelayed, isDelayed);

  overrideMaritimeDemoVessel(nextVehicle);
  return {
    nextVehicle,
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

// TODO: quick implementation, needs optimisation (batch state upates, mergeIn..)
export function localTick(dispatch, getState) {
  const processedList = getProcessedVehicles(getState());
//  debugger
  const nowMs = Date.now();
  const itrtr = processedList.values();
  let next = itrtr.next();
  while (!next.done) {
    const vehicle = next.value;
    next = itrtr.next();
    const vehicleId = vehicle.get('id');
    const speed = vehicle.get('speed');
    const deltaTimeMs = nowMs - vehicle.get('lastUpdateSinceEpoch');
    // estimated travel dist since last update, in meters
    const delatDistKm = speed * (deltaTimeMs / 1000 / 60 / 60);
    vehiclesActions.localUpdateVehicle({
      id: vehicleId,
      timeSinceUpdateMin: Math.round(deltaTimeMs / 1000 / 60),
      estimatedTravelKm: delatDistKm,
    },
      dispatch
    );
  }
}

export function updateLocalVehicles(wsStatuses, getState) {
  const nextLocalVehicles = {};
  const processedList = getProcessedVehicles(getState());
  const now = Date.now();
  let deadList = getDeadList(getState());
  let delayedList = getDelayedList(getState());

  wsStatuses.forEach(status => {
    const localVehicle = processedList.get(status.id);
    const { nextVehicle, willDead, willDelayed } = updateLocalVehicle(localVehicle, status, now);
    nextLocalVehicles[status.id] = nextVehicle;

    deadList = updateList(deadList, willDead, status.id);
    delayedList = updateList(delayedList, willDelayed, status.id);
  });

  return {
    updates: new Map(nextLocalVehicles),
    deadList,
    delayedList,
  };
}

export function makeLocalVehicle(backEndObject = {}, vehicleStats = {}, now) {
  if (backEndObject.status !== 'active') {
    return null;
  }
  overrideMaritimeDemoData(vehicleStats);

  const hasPos = vehicleStats.hasOwnProperty('pos');

  const hasDist = vehicleStats.hasOwnProperty('dist');
  const hasTemp = vehicleStats.hasOwnProperty('temp');
  const ts = new Date(vehicleStats.ts).getTime();

  const lt = hasPos ? vehicleStats.pos.latlon.lat : 0;
  const ln = hasPos ? vehicleStats.pos.latlon.lng : 0;

  /**
   * Use Object.assign to automatically merge all backEndObject properties
   * with custom local properties. In that case you won't need to know
   * how exactly backEndObject changed, and still have possibility to create
   * new custom properties. We use this model across whole applicatoin,
   * so change it carefully.
   *
   * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   **/
  const theVehicle = Object.assign({}, backEndObject, {
    filteredOut: false,
    pos: [lt, ln],
    speed: hasPos ? vehicleStats.pos.speed : 0,
    dist: {
      total: hasDist && vehicleStats.dist.total || 0, // m
      lastTrip: hasDist && vehicleStats.dist.lastTrip || 0, // m
    },
    temp: hasTemp ? vehicleStats.temp.temperature : undefined,
    lastUpdateSinceEpoch: ts,
    isDead: !hasPos,
    // TODO: what should be initilal ign status?
    ignitionOn: 1,
    isDelayedWithIgnitionOff: false,
    isDelayed: checkLaggedVehicle(now, ts),
    kind: backEndObject.kind || 'UNDEFINED',
    name: backEndObject.name || 'Noname',
    // TODO: properly set initilal values
    timeSinceUpdateMin: 1,
    estimatedTravelKm: 10,
  });

  overrideMaritimeDemoVessel(theVehicle);
  return {
    vehicle: theVehicle,
    isDead: theVehicle.isDead,
    isDelayed: theVehicle.isDelayed,
  };
}

//
// delayed update? (comm coverage, expected to be ~45min)
export function checkLaggedVehicle(now, lastUpdate) {
  const deltaTMs = now - lastUpdate;

  return deltaTMs > LAG_INDICAION_TRH_MS && deltaTMs < ZOMBIE_TIME_TRH_MS;
}

function checkIgnition(status) {
  // ignitionOn values:  0- off; 1- on; 2- undefined
  return status.ignOn !== undefined ? (status.ignOn ? 1 : 0) : 2;
}
export function makeLocalVehicles(backEndVehiclesList, statsList) {
  const localVehicles = {};
  const orderedVehicles = sortVehicles(backEndVehiclesList);
  const deadList = [];
  const delayedList = [];
  const now = Date.now();

  backEndVehiclesList.forEach((aVehicle) => {
    const vehicleStats = getVehicleById(aVehicle.id, statsList).vehicle;
    const localVehicle = makeLocalVehicle(aVehicle, vehicleStats, now);

    if (localVehicle) {
      const { vehicle, isDead, isDelayed } = localVehicle;

      localVehicles[aVehicle.id] = vehicle;

      if (isDead) {
        deadList.push(aVehicle.id);
      }

      if (isDelayed) {
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

export function sortVehicles(vehicles) {
  return vehicles
    .sort(sortByName)
    .map(obj => obj.id);
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
export function getVehicleById(id, allVehicles = []) {
  let vehicleIndex;
  let vehicle;

  for (let i = 0; i < allVehicles.length; i++) {
    if (allVehicles[i].id === id) {
      vehicleIndex = i;
      vehicle = allVehicles[i];
      break;
    }
  }

  return {
    vehicle,
    vehicleIndex,
  };
}
