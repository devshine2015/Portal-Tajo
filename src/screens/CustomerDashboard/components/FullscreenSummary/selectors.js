import { createSelector } from 'reselect';
import { getProcessedVehicles } from 'services/FleetModel/reducer';

export default function makeGetVehicles() {
  return createSelector(getProcessedVehicles, (vehicles) => {
    return vehicles.toArray().map((v) => {
      return ({
        id: v.get('id'),
        name: v.getIn(['original', 'name']),
        speed: v.get('speed').toFixed(0),
        fuel: v.get('fuel'),
        pos: {
          lat: v.get('pos')[0],
          lng: v.get('pos')[1],
        },
        updatedAt: v.get('lastUpdateSinceEpoch'),
      });
    });
  });
}
