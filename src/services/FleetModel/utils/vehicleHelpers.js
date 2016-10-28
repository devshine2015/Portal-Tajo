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
import { ZOMBIE_TIME_TRH_MS, LAG_INDICAION_TRH_MS } from 'utils/constants';
import { sortByName } from 'utils/sorting';

function updateLocalVehicle(status) {
  const sinceEpoch = (new Date(status.ts)).getTime();
  const isZombie = checkZombieVehicle(sinceEpoch);
  const nextStatus = {
    isZombie,
    isDead: false,
    lastUpdateSinceEpoch: sinceEpoch,
  };

  if (status.temp !== undefined) {
    nextStatus.temp = status.temp.temperature;
  }
  if (status.dist !== undefined) {
    nextStatus.dist = status.dist;
  }
  if (status.pos !== undefined) {
    nextStatus.pos = [status.pos.latlon.lat, status.pos.latlon.lng];
    nextStatus.speed = status.pos.speed;
  }

  return nextStatus;
}

export function updateLocalVehicles(wsStatuses) {
  const updates = {};

  wsStatuses.forEach(status => {
    updates[status.id] = updateLocalVehicle(status);
  });

  return updates;
}

export function makeLocalVehicle(backEndObject = {}, vehicleStats = {}) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }

  const hasPos = vehicleStats.hasOwnProperty('pos');
  const hasDist = vehicleStats.hasOwnProperty('dist');
  const hasTemp = vehicleStats.hasOwnProperty('temp');

  const lt = hasPos ? vehicleStats.pos.latlon.lat : 39.75 + Math.random() * 0.5;
  const ln = hasPos ? vehicleStats.pos.latlon.lng : -74.70 + Math.random() * 0.5;

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
    lastUpdateSinceEpoch: 0,
    isZombie: true, // reported more the ZOMBIE_TIME_TRH_MINUTES ago
    isDead: true,   // never updated/reported
    // make sure we have some valid kind for vehicle
    // posibly need different icon for this
    kind: backEndObject.kind || 'UNDEFINED',
    // ----
  });

  return theVehicle;
}

//
// inactive/not updated vehicle - device failure?
export function checkZombieVehicle(lastUpdate) {
  const deltaTMs = (Date.now() - lastUpdate);
  return deltaTMs > ZOMBIE_TIME_TRH_MS;
}

//
// delayed update? (comm coverage, expected to be ~45min)
export function checkLaggedVehicle(lastUpdate) {
  const deltaTMs = (Date.now() - lastUpdate);
  return deltaTMs > LAG_INDICAION_TRH_MS;
}

export function makeLocalVehicles(backEndVehiclesList, statsList) {
  const localVehicles = {};
  const orderedVehicles = sortVehicles(backEndVehiclesList);

  backEndVehiclesList.forEach((aVehicle) => {
    const vehicleStats = getVehicleById(aVehicle.id, statsList).vehicle;
    const localVehicleObj = makeLocalVehicle(aVehicle, vehicleStats);

    if (localVehicleObj !== null) {
      localVehicles[aVehicle.id] = localVehicleObj;
    }

    // orderedVehicles.push(aVehicle.id);
  });

  return {
    localVehicles,
    orderedVehicles,
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
