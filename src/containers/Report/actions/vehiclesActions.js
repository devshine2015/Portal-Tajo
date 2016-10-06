import { isVehicleAlreadyAdded } from '../reducer';

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
  if (isInputChecked) {
    if (isVehicleAlreadyAdded(getState(), id) === -1) {
      dispatch(_addAvailableVehicle(id));
    }
  } else {
    dispatch(_removeAvailableVehicle(id));
  }
}

const _addAvailableVehicle = (id) => ({
  type: VEHICLE_ADD,
  id,
});

const _removeAvailableVehicle = (id) => ({
  type: VEHICLE_REMOVE,
  id,
});
