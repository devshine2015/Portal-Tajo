import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';

export const fetchFleet = (openWebSocket = false) => dispatch => {
  dispatch(fetchGFs());
  dispatch(fetchVehicles(openWebSocket));
};
