import uuid from 'node-uuid';
import {
  api,
  auth0Api,
  getExtAccessToken,
} from 'utils/api';
import { isFeatureSupported } from 'configs';
import endpoints from 'configs/endpoints';

export const PERMISSIONS_FETCH_SUCCESS = 'services/usersManager/PERMISSIONS_FETCH_SUCCESS';
export const PERMISSION_CREATE = 'services/UsersManager/PERMISSION_CREATE';
export const PERMISSION_DELETE = 'services/UsersManager/PERMISSION_DELETE';

const _fetchPermissionsNext = async (accessToken) => {
  const { url, method, apiVersion } = endpoints.getPermissionsNext;
  const options = {
    apiVersion,
    optionalHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api[method](url, options);
};

/**
 * @desc for auth0-enabled users in environment not fully supports auth0
 */
const _fetchPermissions = async (accessToken) => {
  const { url, method, apiVersion } = endpoints.getPermissions;
  const options = {
    apiVersion,
    payload: {
      access_token: accessToken,
    },
  };

  return api[method](url, options);
};

export const fetchPermissions = () => (dispatch) => {
  const { extName } = endpoints.getPermissions;
  const accessToken = getExtAccessToken(extName, auth0Api);
  const fetchMethod = isFeatureSupported('auth0Full') ? _fetchPermissionsNext : _fetchPermissions;

  return fetchMethod(accessToken)
    .then(res => res.json())
    .then((res) => {
      const permsMap = {};
      const permsList = [];

      res.permissions.forEach(perm => {
        permsMap[perm._id] = perm;
        permsList.push(perm._id);
      });

      dispatch(_permissionsFetchSuccess(permsMap, permsList));
    });
};

const _permissionsFetchSuccess = (permsMap, permsList) => ({
  type: PERMISSIONS_FETCH_SUCCESS,
  permsMap,
  permsList,
});

export const createPermission = payload => {
  payload.id = uuid.v4();

  return ({
    type: PERMISSION_CREATE,
    permission: payload,
  });
};

export const deletePermission = index => ({
  type: PERMISSION_DELETE,
  index,
});
