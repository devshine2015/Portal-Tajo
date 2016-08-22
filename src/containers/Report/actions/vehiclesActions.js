import {
  isVehicleAlreadyAdded,
  getFilteredVehicles,
} from '../reducer';
import { filterByName } from 'services/FleetModel/utils/vehicleHelpers';
import { getVehicles } from 'services/FleetModel/reducer';

export const REPORT_VEHICLES_ADD = 'portal/Report/REPORT_VEHICLES_ADD';
export const REPORT_VEHICLES_REMOVE = 'portal/Report/REPORT_VEHICLES_REMOVE';
export const REPORT_VEHICLES_FILTER = 'portal/Report/REPORT_VEHICLES_FILTER';

export const chooseVehiclesForReport = (id, isInputChecked) => (dispatch, getState) =>
  _chooseVehiclesForReport({ id, isInputChecked }, dispatch, getState);
export const filterVehicles = (filterString, isClearing) => (dispatch, getState) =>
  _filterVehicles({ filterString, isClearing }, dispatch, getState);

function _filterVehicles({ filterString, isClearing }, dispatch, getState) {
  const filteredList = filterByName(
    getFilteredVehicles(getState()),
    getVehicles(getState()),
    filterString,
    isClearing
  );
  const isFiltering = filterString !== '';

  dispatch(_filter(filteredList, isFiltering));
}

function _chooseVehiclesForReport({ id, isInputChecked }, dispatch, getState) {
  if (isInputChecked) {
    if (isVehicleAlreadyAdded(getState(), id) === -1) {
      dispatch(addAvailableVehicle(id));
    }
  } else {
    dispatch(removeAvailableVehicle(id));
  }
}

const addAvailableVehicle = (id) => ({
  type: REPORT_VEHICLES_ADD,
  id,
});

const removeAvailableVehicle = (id) => ({
  type: REPORT_VEHICLES_REMOVE,
  id,
});

const _filter = (list, isFiltering) => ({
  type: REPORT_VEHICLES_FILTER,
  list,
  isFiltering,
});
