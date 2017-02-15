import endpoints from 'configs/endpoints';
import api from 'utils/api';
import { makeLocalGFs } from '../utils/gfHelpers';
import { getProcessedGFs } from '../reducer';
import { filterProcessedListByName } from '../utils/filtering';

export const FLEET_MODEL_GF_SET = 'portal/services/FLEET_MODEL_GF_SET';
export const FLEET_MODEL_GF_FILTER = 'portal/services/FLEET_MODEL_GF_FILTER';

export const fetchGFs = () => _fetchGFs;
export const filterGFs = (searchString) => (dispatch, getState) =>
  _filterGf({ searchString }, dispatch, getState);
export const createGF = (newGF, idx) => (dispatch, getState) =>
  _createGFRequest(newGF, idx, dispatch, getState);
export const updateGF = (theGF, id, idx) => (dispatch, getState) =>
  _editGFRequest(theGF, id, idx, dispatch, getState);
export const deleteGF = (id) => (dispatch, getState) =>
  _deleteGFRequest(id, dispatch, getState);

/**
 * fleet is optional
 **/
function _fetchGFs(dispatch) {
  const { url, method } = endpoints.getGFs;

  return api[method](url)
    .then(toJson)
    .then(gfs => {
      const { localGFs, sortedGFs } = makeLocalGFs(gfs);
      dispatch(_gfSet(gfs, localGFs, sortedGFs));
    })
    .catch(e => {
      console.error(e);
    });
}

/**
 * POST - new GF details to the server
 **/
function _createGFRequest(gfObject, index, dispatch, getState) {
  const { url, method } = endpoints.createGF;

  return api[method](url, {
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
  const { url, method } = endpoints.deleteGF(id);

  return api[method](url).then(() => {
    _fetchGFs(dispatch, getState);
    return Promise.resolve();
  }, error => Promise.reject(error));
}

function toJson(response) {
  return response.json();
}

function _filterGf({ searchString }, dispatch, getState) {
  const originGFs = getProcessedGFs(getState());
  const options = {
    objectsList: originGFs,
    searchString,
    path: 'name',
  };
  const filteredVehicles = filterProcessedListByName(options);

  dispatch(_gfsFilterUpdate(filteredVehicles));
}

const _gfSet = (gfs, localGFs, sortedGFs) => ({
  type: FLEET_MODEL_GF_SET,
  gfs,
  localGFs,
  sortedGFs,
});

const _gfsFilterUpdate = (gfs) => ({
  type: FLEET_MODEL_GF_FILTER,
  gfs,
});
