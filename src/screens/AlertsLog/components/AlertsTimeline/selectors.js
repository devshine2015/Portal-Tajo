import { createSelector } from 'reselect';
import { getVehiclleById } from 'services/FleetModel/reducer';

export default () => {
  return createSelector([getVehiclleById], (vehicle) => {
    return {
      vehicleName: vehicle.original.name,
    };
  });
};
