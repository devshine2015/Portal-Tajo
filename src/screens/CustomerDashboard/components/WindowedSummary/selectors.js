import R from 'ramda';
import { createSelector } from 'reselect';
import { getProcessedVehicles } from 'services/FleetModel/reducer';
import localAlertsProcessor from 'services/AlertsSystem/utils/localAlertsProcessor';
import { sortByName } from 'utils/sorting';

export default function makeGetVehicles() {
  return createSelector(getProcessedVehicles, vehicles => vehicles.toArray()
    .map(v => ({
      id: v.get('id'),
      name: v.getIn(['original', 'name']),
      speed: v.get('speed').toFixed(0),
      fuel: R.isNil(v.get('fuel')) ? undefined : v.get('fuel').toFixed(1),
      temp: R.isNil(v.get('temp')) ? undefined : v.get('temp').toFixed(1),
      pos: {
        lat: v.get('pos')[0],
        lng: v.get('pos')[1],
      },
      lastUpdate: v.get('lastUpdateSinceEpoch'),
      alertsState: localAlertsProcessor.getVehicleAlertState(v.toJS()),
    })))
    .sort(sortByName);
}
