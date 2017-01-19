import {
  getProcessedVehicles,
} from '../reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import { checkLaggedVehicle } from './vehicleHelpers';
import { Map } from 'immutable';

// TODO: needs better name, here we update/reevaluate all the
// delay statuses, etc
// passing nowMs so we dont aquire it for every vehicle (optimisation?)
export function vehicleClientUpdate(imVehicle, nowMs, inIgnitionStatus) {
  const ignitionOn = inIgnitionStatus | imVehicle.get('ignitionOn');
  const isUpdate = inIgnitionStatus !== undefined;
  const deltaTimeMin = isUpdate ? 0 : (nowMs - imVehicle.get('lastUpdateSinceEpoch')) / 1000 / 60;
  const isDelayedWithIgnitionOff = ignitionOn !== 1 && checkLaggedVehicle(deltaTimeMin);
  const isDelayed = ignitionOn === 1 ? checkLaggedVehicle(deltaTimeMin) : false;

  // estimated travel dist since last update, in meters
  const deltaDistKm = isUpdate ? 0 : imVehicle.get('speed') * (deltaTimeMin / 60);
  return {
    isDelayedWithIgnitionOff,
    isDelayed,
    deltaTimeMin: Math.round(deltaTimeMin),
    deltaDistKm,
  };
}

// TODO: this needs some optimisation/rethinking - probably
// will be too slow on big fleets
export function localTick(dispatch, getState) {
  // const t0 = performance.now();
  const nowMs = Date.now();
  const imProcessedList = getProcessedVehicles(getState());
  const vehItr = imProcessedList.values();
  let imUpdatedProcessedList = new Map({});
  let currentIt = vehItr.next();
  const vehUpdater = tickUpdated => vh => {
    vh.set('estimatedTravelKm', tickUpdated.deltaDistKm)
    .set('timeSinceUpdateMin', tickUpdated.deltaTimeMin)
    .set('ignitionOn', tickUpdated.ignitionOn)
    .set('isDelayedWithIgnitionOff', tickUpdated.isDelayedWithIgnitionOff);};
  while (!currentIt.done) {
    const imVehicle = currentIt.value;
//    const vehicleId = currentIt.key;
    currentIt = vehItr.next();
    const vehicleId = imVehicle.get('id');
    const tickUpdatedValues = vehicleClientUpdate(imVehicle, nowMs);
//    const speed = imVehicle.get('speed');
    const imUpdatedVehicle = imVehicle.withMutations(vehUpdater(tickUpdatedValues));
    imUpdatedProcessedList = imUpdatedProcessedList.mergeIn([vehicleId], imUpdatedVehicle);
  }
  vehiclesActions.updateVehiclesList(imUpdatedProcessedList, dispatch);
  // console.log('localTick took ' + (performance.now() - t0).toFixed(2) + ' ms');
}
