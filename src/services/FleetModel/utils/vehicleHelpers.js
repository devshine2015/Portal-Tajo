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
import { ZOMBIE_TIME_TRH_MINUTES } from 'utils/constants';
import { sortByName } from 'utils/sorting';

function makeLocalVehicle(backEndObject, vehicleStats) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }

  const hasPos = vehicleStats.hasOwnProperty('pos');
  const hasDist = vehicleStats.hasOwnProperty('dist');
  const hasTemp = vehicleStats.hasOwnProperty('temp');

  const lt = hasPos ? vehicleStats.pos.latlon.lat : 39.75 + Math.random() * 0.5;
  const ln = hasPos ? vehicleStats.pos.latlon.lng : -74.70 + Math.random() * 0.5;

  const theVehicle = {
    filteredOut: false,
    //----
    name: backEndObject.name,
    id: backEndObject.id,
    // ----
    licensePlate: backEndObject.licensePlate,
    make: backEndObject.make,
    model: backEndObject.model,
    year: backEndObject.year,

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
    kind: backEndObject.kind || 'SGV',
    // ----
    // TODO: the history - keep it in sep
    chronicleFrame: null,
  };

  return theVehicle;
}

//
// inactive/not updated vehicle - device failure?
export function checkZombieVehicle(lastUpdate) {
  const nowSinceEpoch = (new Date()).getTime();
  const deltaTMinutes = (nowSinceEpoch - lastUpdate) / 1000 / 60;
  return deltaTMinutes > ZOMBIE_TIME_TRH_MINUTES;
}

export function makeLocalVehicles(backEndVehiclesList, statsList) {
  const localVehicles = {};
  const orderedVehicles = [];

  backEndVehiclesList.sort(sortByName).forEach((aVehicle) => {
    const vehicleStats = getVehicleById(aVehicle.id, statsList).vehicle;
    const localVehicleObj = makeLocalVehicle(aVehicle, vehicleStats);

    if (localVehicleObj !== null) {
      localVehicles[aVehicle.id] = localVehicleObj;
    }

    orderedVehicles.push(aVehicle.id);
  });

  return {
    localVehicles,
    orderedVehicles,
  };
}

export function cleanVehicle(vehicle) {
  const newVehicle = Object.assign({}, vehicle);

  delete newVehicle.dist;
  delete newVehicle.filteredOut;
  delete newVehicle.isDead;
  delete newVehicle.isZombie;
  delete newVehicle.lastUpdateSinceEpoch;
  delete newVehicle.pos;
  delete newVehicle.speed;
  delete newVehicle.temp;

  return newVehicle;
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
