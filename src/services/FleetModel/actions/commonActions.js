import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';
import { fetchDrivers } from './driversActions';
// import { fetchVehicleAlerts } from './vehiclesActions';


export const fetchFleet = getState => (dispatch) => {
  dispatch(fetchDrivers());
  dispatch(fetchGFs());
  return dispatch(fetchVehicles(getState));
  // .then(() => fetchVehicleAlerts(dispatch, getState));
};

