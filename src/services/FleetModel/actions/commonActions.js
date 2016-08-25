import { getFleetName } from 'containers/App/reducer';
import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';

export const fetchFleet = (openWebSocket = false) => (dispatch, getState) => {
  const fleet = getFleetName(getState());

  dispatch(fetchGFs(fleet));
  dispatch(fetchVehicles(fleet, openWebSocket));
};
