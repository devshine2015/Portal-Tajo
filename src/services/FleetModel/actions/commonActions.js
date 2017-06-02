import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';
import { fetchDrivers } from './driversActions';

export const fetchFleet = () => (dispatch) => {
  dispatch(fetchDrivers());
  dispatch(fetchGFs());
  return dispatch(fetchVehicles());
};

