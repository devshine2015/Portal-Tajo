import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';

export const fetchFleet = () => dispatch => {
  dispatch(fetchGFs());
  dispatch(fetchVehicles());
};
