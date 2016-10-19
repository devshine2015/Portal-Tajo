import { getVehiclesAmount } from 'services/FleetModel/reducer';
import {
  isVehicleAlreadyAdded,
  getSelectedVehiclesAmount,
} from '../reducer';

export const VEHICLE_ADD = 'portal/Report/VEHICLE_ADD';
export const VEHICLE_REMOVE = 'portal/Report/VEHICLE_REMOVE';
export const VEHICLES_FILTERING = 'portal/Report/VEHICLES_FILTERING';

export const chooseVehiclesForReport = (id, isInputChecked) => (dispatch, getState) =>
  _chooseVehiclesForReport({ id, isInputChecked }, dispatch, getState);
export const setFiltering = filterString => ({
  type: VEHICLES_FILTERING,
  isFiltering: filterString !== '',
});

function _chooseVehiclesForReport({ id, isInputChecked }, dispatch, getState) {
  let selectedVehiclesAmount = getSelectedVehiclesAmount(getState());
  const nextSelectedAmount = isInputChecked ? ++selectedVehiclesAmount : --selectedVehiclesAmount;
  let selectedTooMuch;

  if (isInputChecked) {
    const vehicleNotAddded = isVehicleAlreadyAdded(getState(), id) === -1;

    if (vehicleNotAddded) {
      selectedTooMuch = nextSelectedAmount > 3;

      dispatch(_addAvailableVehicle(id, selectedTooMuch));
    }
  } else {
    const vehiclesAmount = getVehiclesAmount(getState());

    selectedTooMuch = (nextSelectedAmount === 0 && vehiclesAmount > 3) ||
                      nextSelectedAmount > 3;

    dispatch(_removeAvailableVehicle(id, selectedTooMuch));
  }
}

const _addAvailableVehicle = (id, selectedTooMuch) => ({
  type: VEHICLE_ADD,
  id,
  selectedTooMuch,
});

const _removeAvailableVehicle = (id, selectedTooMuch) => ({
  type: VEHICLE_REMOVE,
  id,
  selectedTooMuch,
});
