import { createSelector } from 'reselect';
import { getProcessedVehicles } from 'services/FleetModel/reducer';

export default function makeGetVehicles() {
  return createSelector(getProcessedVehicles, (vehicles) => {
    return vehicles;
  });
}
