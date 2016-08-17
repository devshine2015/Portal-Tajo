import { isVehicleAlreadyAdded } from '../reducer';

export const REPORT_VEHICLES_ADD = 'portal/Report/REPORT_VEHICLES_ADD';
export const REPORT_VEHICLES_REMOVE = 'portal/Report/REPORT_VEHICLES_REMOVE';

export const changeVehiclesForReport = (id, isInputChecked) => (dispatch, getState) =>
  _changeVehiclesForReport({ id, isInputChecked }, dispatch, getState);

function _changeVehiclesForReport({ id, isInputChecked }, dispatch, getState) {
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
