import { getFleetName } from 'containers/App/reducer';
import { fetchVehicles, filterVehicles } from './vehiclesActions';
import { fetchGFs, filterGFs } from './gfActions';

export const fetchFleet = (openWebSocket = false) => (dispatch, getState) => {
  const fleet = getFleetName(getState());

  dispatch(fetchGFs(fleet));
  dispatch(fetchVehicles(fleet, openWebSocket));
};

export const filterVehiclesDo = (filterName) => (dispatch) => {
  dispatch(filterVehicles(filterName));
};

export const filterGFsDo = (filterName) => (dispatch) => {
  dispatch(filterGFs(filterName));
};
