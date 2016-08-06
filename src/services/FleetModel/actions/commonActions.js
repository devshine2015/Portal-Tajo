import { getFleetName } from 'containers/App/reducer';
import { fetchVehicles, filterVehicles } from './vehiclesActions';
import { fetchLocations, filterLocations } from './locationsActions';

export const fetchFleet = (openWebSocket = false) => (dispatch, getState) => {
  _fetchFleet(dispatch, getState);
};

function _fetchFleet(dispatch, getState) {
  const fleet = getFleetName(getState());

  dispatch(fetchLocations(fleet));
  dispatch(fetchVehicles(fleet));
}

export const filterVehiclesDo = (filterName) => (dispatch) => {
  dispatch(filterVehicles(filterName));
};

export const filterLocationsDo = (filterName) => (dispatch) => {
  dispatch(filterLocations(filterName));
};
