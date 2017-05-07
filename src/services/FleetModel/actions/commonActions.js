import { conditionsActions } from 'services/AlertsSystem/actions';
import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';

export const fetchFleet = () => (dispatch) => {
  dispatch(conditionsActions.fetchAlertConditions());
  dispatch(fetchGFs());
  return dispatch(fetchVehicles());
};
