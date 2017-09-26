import R from 'ramda';
import { isFeatureSupported } from 'configs';
import {
  api,
  auth0Api,
  getExtAccessToken,
} from 'utils/api';
import endpoints from 'configs/endpoints';
import { rolesSelectors } from '../selectors';

export const ROLES_FETCH_SUCCESS = 'services/usersManager/ROLES_FETCH_SUCCESS';
export const ROLE_CREATE = 'services/UsersManager/ROLE_CREATE';
export const ROLE_DELETE = 'services/UsersManager/ROLE_DELETE';
export const ROLE_ASSIGN = 'services/UsersManager/ROLE_ASSIGN';
export const ROLE_UNASSIGN = 'services/UsersManager/ROLE_UNASSIGN';

const _fetchRolesNext = async (accessToken) => {
  const { url, method, apiVersion } = endpoints.getRolesNext;
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
const _fetchRoles = async (accessToken) => {
  const { url, method, apiVersion } = endpoints.getRoles;
  const options = {
    apiVersion,
    payload: {
      access_token: accessToken,
    },
  };

  return api[method](url, options);
};

export const fetchRoles = () => (dispatch) => {
  const { extName } = endpoints.getPermissions;
  const accessToken = getExtAccessToken(extName, auth0Api);
  const fetchMethod = isFeatureSupported('auth0Full') ? _fetchRolesNext : _fetchRoles;

  return fetchMethod(accessToken)
    .then(res => res.json())
    .then((res) => {
      const rolesMap = {};
      const rolesList = [];

      res.roles.forEach((role) => {
        rolesMap[role._id] = role;
        rolesList.push(role._id);
      });

      dispatch(_rolesFetchSuccess(rolesMap, rolesList));
    });
};

export const assignRole = (userId, role) => (dispatch) => {
  const { url, method, extName } = endpoints.assignRoleToUser(userId);
  const payload = [role];

  return auth0Api[method](url, { payload, extName })
    .then(() => dispatch(_assignRoleToUser(userId, role)));
};

function findEntries(roles, userId) {
  return roles.filter((role) => {
    if (role.has('users')) {
      return role.get('users').includes(userId);
    }
    return false;
  });
}

const getRolesIdByUserId = (roles, userId) => {
  const entries = findEntries(roles, userId);

  if (entries.size === 0) return [];

  return entries.map(role => role.get('_id')).toArray();
};

export const unassignRole = userId => (dispatch, getState) => {
  const roles = rolesSelectors.getRoles(getState());
  const ids = getRolesIdByUserId(roles, userId);

  // user hasn't roles assigned to him - nothing to do
  if (R.isEmpty(ids)) return Promise.resolve();

  const { url, method, extName } = endpoints.unassignRoleToUser(userId);
  const payload = ids;

  return auth0Api[method](url, { payload, extName })
    .then(() => 
      dispatch(_unassignRoleToUser(userId, ids))
    );
};

const _rolesFetchSuccess = (rolesMap, rolesList) => ({
  type: ROLES_FETCH_SUCCESS,
  rolesMap,
  rolesList,
});

// export const createRole = payload => {
//   payload.id = uuid.v4();

//   return ({
//     type: ROLE_CREATE,
//     role: payload,
//   });
// };

// export const deleteRole = index => ({
//   type: ROLE_DELETE,
//   index,
// });

const _assignRoleToUser = (userId, roleId) => ({
  type: ROLE_ASSIGN,
  userId,
  roleId,
});

const _unassignRoleToUser = (userId, rolesIds) => ({
  type: ROLE_UNASSIGN,
  userId,
  rolesIds,
});
