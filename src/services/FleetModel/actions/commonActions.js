import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';
import { fetchAlertConditions, fetchAlertsHistory } from 'services/AlertsSystem/actions';
import { mwaFetchJobs } from 'services/MWA/actions';
import { isMwa } from 'configs';

export const fetchFleet = () => (dispatch, getState) => {
  dispatch(fetchAlertConditions());
  dispatch(fetchAlertsHistory(getState));
  dispatch(fetchGFs());
  if (isMwa) {
    dispatch(mwaFetchJobs());
  }
  return dispatch(fetchVehicles());
};
