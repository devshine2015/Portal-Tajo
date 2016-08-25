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

import { getVehicleByValue } from './vehiclesMap';
import { ZOMBIE_TIME_TRH_MINUTES } from 'utils/constants';

function makeLocalVehicle(backEndObject) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }

  const lt = 39.75 + Math.random() * 0.5;
  const ln = -74.70 + Math.random() * 0.5;

  const theVehicle = Object.assign({}, backEndObject, {
    filteredOut: false,
    odometer: backEndObject.hasOwnProperty('odometer') ?
      backEndObject.odometer : { value: '' },
    pos: [lt, ln],
    speed: 0,
    dist: { total: 0, lastTrip: 0 },
    temp: undefined,
    lastUpdateSinceEpoch: 0,
    isZombie: true, // reported more the ZOMBIE_TIME_TRH_MINUTES ago
    isDead: true,   // never updated/reported
  });

  return theVehicle;
}

//
// inactive/not updated vehicle - device failure?
export function checkZombieVehicle(lastUpdate) {
  const nowSinceEpoch = (new Date()).getTime();
  const deltaTMinutes = (nowSinceEpoch - lastUpdate) / 1000 / 60;
  return deltaTMinutes > ZOMBIE_TIME_TRH_MINUTES;
}

export default function MakeLocalVehicles(backEndVehiclesList) {
  const theVechicles = {};

  backEndVehiclesList.forEach((aVehicle) => {
    const localVehicleObj = makeLocalVehicle(aVehicle);
    if (localVehicleObj !== null) {
      theVechicles[aVehicle.id] = localVehicleObj;
    }
  });

  return theVechicles;
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

  const vehicle = allVehicles.filter((v, i) => {
    if (v.id === id) {
      vehicleIndex = i;
      return true;
    }

    return false;
  });

  return {
    vehicle,
    vehicleIndex,
  };
}
