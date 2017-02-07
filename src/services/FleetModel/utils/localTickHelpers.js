import { Map } from 'immutable';
import { vehiclesActions } from 'services/FleetModel/actions';
import { getProcessedVehicles } from '../reducer';
import {
  checkLaggedVehicle,
  checkIgnition,
} from './vehicleHelpers';

const _vehUpdater = tickUpdated => vh => {
  vh.set('estimatedTravelKm', tickUpdated.deltaDistKm)
    .set('timeSinceUpdateMin', tickUpdated.deltaTimeMin)
    .set('isDelayedWithIgnitionOff', tickUpdated.isDelayedWithIgnitionOff);
};

function _calcDeltaTimeMin(nowMs, imVehicle) {
  return (nowMs - imVehicle.get('lastUpdateSinceEpoch')) / 1000 / 60;
}

// TODO: needs better name, here we update/reevaluate all the
// delay statuses, etc
// passing nowMs so we dont aquire it for every vehicle (optimisation?)
export function vehicleClientUpdate({
  imVehicle,
  nowMs,
  ignitionOn,
  isLocalTick = false,
}) {
  // what if during initial fleetModel creation
  // latest status timestamp will be old (like many days), no events will ever come
  // from vehicle (something broken) with ws,
  // but it has ignitionOn = 1 (true)?
  const deltaTimeMin = isLocalTick ? 0 : _calcDeltaTimeMin(nowMs, imVehicle);
  const isDelayedWithIgnitionOff = ignitionOn !== 1 && checkLaggedVehicle(deltaTimeMin);
  const isDelayed = ignitionOn === 1 ? checkLaggedVehicle(deltaTimeMin) : false;

  // estimated travel dist since last update, in meters
  const deltaDistKm = isLocalTick ? 0 : imVehicle.get('speed') * (deltaTimeMin / 60);
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
  const nowMs = Date.now();
  const imProcessedList = getProcessedVehicles(getState());
  const vehItr = imProcessedList.values();
  let imUpdatedProcessedList = new Map({});
  let currentIt = vehItr.next();

  while (!currentIt.done) {
    const imVehicle = currentIt.value;
    currentIt = vehItr.next();
    const vehicleId = imVehicle.get('id');
    const ignitionOn = checkIgnition(imVehicle.get('ignitionOn'));
    const tickUpdatedValues = vehicleClientUpdate({
      nowMs,
      imVehicle,
      ignitionOn,
      isLocalTick: true,
    });
    const imUpdatedVehicle = imVehicle.withMutations(_vehUpdater(tickUpdatedValues));
    imUpdatedProcessedList = imUpdatedProcessedList.mergeIn([vehicleId], imUpdatedVehicle);
  }
  vehiclesActions.updateVehiclesList(imUpdatedProcessedList, dispatch);
}
