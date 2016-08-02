import { getFleetName } from 'containers/App/reducer';
import { fetchVehicles } from './vehiclesActions';
import { fetchLocations } from './locationsActions';

export const fetchFleet = (openWebSocket = false) => (dispatch, getState) => {
  _fetchFleet(dispatch, getState);
};

function _fetchFleet(dispatch, getState) {
  const fleet = getFleetName(getState());

  dispatch(fetchLocations(fleet));
  return dispatch(fetchVehicles(fleet));
}
