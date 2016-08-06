import api from 'utils/api';
import {
  getFleetName,
  getAuthenticationSession,
} from 'containers/App/reducer';
import processLocations from '../utils/locationsHelpers';

export const FLEET_MODEL_LOCATIONS_SET = 'portal/services/FLEET_MODEL_LOCATIONS_SET';
export const FLEET_MODEL_LOCATIONS_FILTER = 'portal/services/FLEET_MODEL_LOCATIONS_FILTER';

export const fetchLocations = (fleet = undefined) => (dispatch, getState) =>
  _fetchLocations(dispatch, getState, fleet);
export const filterLocations = (filterName) => (dispatch) =>
  dispatch(_locationsFilter(filterName));

/**
 * fleet is optional
 **/
function _fetchLocations(dispatch, getState, fleetName = undefined) {
  const fleet = fleetName || getFleetName(getState());
  const url = `${fleet}/location`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  return api(url, { optionalHeaders })
    .then(toJson)
    .then(locations => {
      const localLocs = processLocations(locations);
      dispatch(_locationsSet(locations, localLocs));
    });
}

/**
 * PUT new updated details to the server
 **/

function toJson(response) {
  return response.json();
}
//

const _locationsSet = (locations, localLocs) => ({
  type: FLEET_MODEL_LOCATIONS_SET,
  locations,
  localLocs,
});

const _locationsFilter = (nameFilter) => ({
  type: FLEET_MODEL_LOCATIONS_FILTER,
  nameFilter,
});
