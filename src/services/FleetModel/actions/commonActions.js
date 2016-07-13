import { getFleetName } from 'containers/App/reducer';
import { fetchVehicles } from './vehiclesActions';

export const fetchFleet = () => (dispatch, getState) =>
  _fetchFleet(dispatch, getState);

function _fetchFleet(dispatch, getState) {
  const fleet = getFleetName(getState());

  return dispatch(fetchVehicles(fleet));
}
