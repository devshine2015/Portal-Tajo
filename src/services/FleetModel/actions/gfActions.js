import api from 'utils/api';
import {
  getFleetName,
  getAuthenticationSession,
} from 'containers/App/reducer';
import { makeLocalGFs } from '../utils/gfHelpers';

export const FLEET_MODEL_GF_SET = 'portal/services/FLEET_MODEL_GF_SET';
export const FLEET_MODEL_GF_FILTER = 'portal/services/FLEET_MODEL_GF_FILTER';

export const fetchGFs = (fleet = undefined) => (dispatch, getState) =>
  _fetchGFs(dispatch, getState, fleet);
export const filterGFs = (filterName) => (dispatch) =>
  dispatch(_gfFilter(filterName));
export const createGF = (newGF, idx) => (dispatch, getState) =>
  _createGFRequest(newGF, idx, dispatch, getState);
export const updateGF = (theGF, id, idx) => (dispatch, getState) =>
  _editGFRequest(theGF, id, idx, dispatch, getState);
export const deleteGF = (id) => (dispatch, getState) =>
  _deleteGFRequest(id, dispatch, getState);

/**
 * fleet is optional
 **/
function _fetchGFs(dispatch, getState, fleetName = undefined) {
  const fleet = fleetName || getFleetName(getState());
  const url = `${fleet}/location`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  return api(url, { optionalHeaders })
    .then(toJson)
    .then(gfs => {
      const localGFs = makeLocalGFs(gfs);
      dispatch(_gfSet(gfs, localGFs));
    });
}

/**
 * POST - new GF details to the server
 **/
function _createGFRequest(gfObject, index, dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/location`;
  const optionalHeaders = {
    ['DRVR-SESSION']: getAuthenticationSession(getState()),
  };

  return api.post(url, {
    optionalHeaders,
    payload: gfObject,
  }).then(() => {
    _fetchGFs(dispatch, getState);
    return Promise.resolve();
  }, error => Promise.reject(error));
}
/**
 * POST - new GF details to the server
 **/
function _editGFRequest(gfObject, id, index, dispatch, getState) {
}
/**
 * DELETE - new GF details to the server
 **/
function _deleteGFRequest(id, dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/location/${id}`;
  const optionalHeaders = {
    ['DRVR-SESSION']: getAuthenticationSession(getState()),
  };

  return api.delete(url, {
    optionalHeaders,
  }).then(() => {
    _fetchGFs(dispatch, getState);
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}
//

const _gfSet = (gfs, localGFs) => ({
  type: FLEET_MODEL_GF_SET,
  gfs,
  localGFs,
});

const _gfFilter = (nameFilter) => ({
  type: FLEET_MODEL_GF_FILTER,
  nameFilter,
});
