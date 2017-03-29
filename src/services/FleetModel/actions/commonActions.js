import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';
import { fetchAlertConditions, fetchAlertsHistory } from 'services/AlertsSystem/actions';

export const fetchFleet = () => (dispatch, getState) => {
  dispatch(fetchAlertConditions());
  dispatch(fetchAlertsHistory(getState));
  dispatch(fetchGFs());
  return dispatch(fetchVehicles());
};
