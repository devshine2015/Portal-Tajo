import { isVehicleAlreadyAdded } from '../reducer';

export const REPORT_VEHICLES_ADD = 'portal/Report/REPORT_VEHICLES_ADD';
export const REPORT_VEHICLES_REMOVE = 'portal/Report/REPORT_VEHICLES_REMOVE';
export const REPORT_VEHICLES_FILTERING = 'portal/Report/REPORT_VEHICLES_FILTERING';

export const chooseVehiclesForReport = (id, isInputChecked) => (dispatch, getState) =>
  _chooseVehiclesForReport({ id, isInputChecked }, dispatch, getState);
export const setFiltering = filterString => ({
  type: REPORT_VEHICLES_FILTERING,
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
  type: REPORT_VEHICLES_ADD,
  id,
});

const _removeAvailableVehicle = (id) => ({
  type: REPORT_VEHICLES_REMOVE,
  id,
});
