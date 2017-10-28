import { fetchVehicles } from './vehiclesActions';
import { fetchGFs } from './gfActions';
import { fetchDrivers } from './driversActions';
// import { fetchVehicleAlerts } from './vehiclesActions';


export const fetchFleet = getStore => (dispatch) => {
  dispatch(fetchDrivers());
  dispatch(fetchGFs());
  return dispatch(fetchVehicles());
    // .then(() => fetchVehicleAlerts(dispatch, getStore));
};

