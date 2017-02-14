import { Map } from 'immutable';
import { isMaritime } from 'configs';
import { getProcessedVehicles } from '../reducer';
import {
  checkIsDelayed,
  checkIgnition,
  calcDeltaTimeMin,
  getActivityStatus,
} from './vehicleHelpers';

const _vehUpdater = tickUpdated => vh => {
  vh.set('estimatedTravelKm', tickUpdated.deltaDistKm)
    .set('timeSinceUpdateMin', tickUpdated.deltaTimeMin)
    .set('isDelayedWithIgnitionOff', tickUpdated.isDelayedWithIgnitionOff);
};

// TODO: needs better name, here we update/reevaluate all the
// delay statuses, etc
// passing now so we dont aquire it for every vehicle (optimisation?)
export function vehicleClientUpdate({
  imVehicle,
  now,
  ignitionOn,
}) {
  // imVehicle could be empty if initial localTick
  // happens before fleetFetching will be finished
  // so assume vehicle is died for now
  const isDead = imVehicle.size === 0;
  const deltaTimeMin = calcDeltaTimeMin(now, imVehicle.get('lastUpdateSinceEpoch'));

  const isDelayed = isDead ? false : checkIsDelayed(now, deltaTimeMin);
  const activityStatus = getActivityStatus(isDead, isDelayed);

  // TODO -- just a combination of already defined props,
  // used just for displaying other type of warn icon =>
  // move isDelayedWithIgnitionOff definition to GenericListItem
  const isDelayedWithIgnitionOff = ignitionOn !== 1 && activityStatus === 'delayed';

  // estimated travel dist since last update, in meters
  // calculate estimated distance only for maritime
  const deltaDistKm = isMaritime ? imVehicle.get('speed') * (deltaTimeMin / 60) : 0;

  return {
    isDelayedWithIgnitionOff,
    activityStatus,
    deltaTimeMin: Math.round(deltaTimeMin),
    deltaDistKm,
  };
}

// updates takes too long
// TODO -- improve performance
// examples:
// action @ 17:11:16.166 portal/services/FLEET_MODEL_VEHICLES_UPDATE_LIST (in 243.00 ms)
// action @ 17:12:16.168 portal/services/FLEET_MODEL_VEHICLES_UPDATE_LIST (in 172.00 ms)
export function localTick(getState) {
  const now = Date.now();
  const imProcessedList = getProcessedVehicles(getState());
  const vehItr = imProcessedList.values();
  let imUpdatedProcessedList = new Map({});
  let currentIt = vehItr.next();

  while (!currentIt.done) {
    const imVehicle = currentIt.value;
    const vehicleId = imVehicle.get('id');
    const ignitionOn = checkIgnition(imVehicle.get('ignitionOn'));
    const tickUpdatedValues = vehicleClientUpdate({
      now,
      imVehicle,
      ignitionOn,
    });
    const imUpdatedVehicle = imVehicle.withMutations(_vehUpdater(tickUpdatedValues));

    imUpdatedProcessedList = imUpdatedProcessedList.mergeIn([vehicleId], imUpdatedVehicle);

    currentIt = vehItr.next();
  }

  return imUpdatedProcessedList;
}

















