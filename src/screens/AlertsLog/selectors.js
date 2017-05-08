import { createSelector } from 'reselect';
import { getVehiclesExSorted } from 'services/FleetModel/reducers/vehiclesReducer';
import { getVehicleFilterString } from 'services/Global/reducers/contextReducer';

export const makeGetVehicles = () => {
  return createSelector(getVehiclesExSorted, (vehicles) => {
    return vehicles;
  });
};

export const makeGetFilterString = () => {
  return createSelector(getVehicleFilterString, (string) => {
    return string;
  });
};
