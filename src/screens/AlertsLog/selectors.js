import { createSelector } from 'reselect';
import {
  getVehiclesExSorted,
  getVehicleById,
} from 'services/FleetModel/reducers/vehiclesReducer';
import {
  getVehicleFilterString,
  getSelectedVehicleId,
} from 'services/Global/reducers/contextReducer';

export const makeGetVehicles = () => {
  return createSelector(getVehiclesExSorted, (vehicles) => {
    return vehicles;
  });
};

export const makeGetSelectedVehicleId = () => {
  return createSelector(getSelectedVehicleId, (selectedVehicleId) => {
    return selectedVehicleId;
  });
};

export const makeGetFilterString = () => {
  return createSelector(getVehicleFilterString, (filterString) => {
    return filterString;
  });
};

export const makeGetSelectedVehicleName = () => {
  return createSelector(getVehicleById, (imVehicle) => {
    return imVehicle ? imVehicle.getIn(['original', 'name']) : undefined;
  });
};
