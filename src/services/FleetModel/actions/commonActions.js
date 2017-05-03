import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';
import { fetchAlertConditions } from 'services/AlertsSystem/actions';

export const fetchFleet = () => (dispatch) => {
  dispatch(fetchAlertConditions());
  dispatch(fetchGFs());
  return dispatch(fetchVehicles());
};
