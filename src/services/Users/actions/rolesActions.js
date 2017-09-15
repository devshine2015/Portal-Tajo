import R from 'ramda';
import { isFeatureSupported } from 'configs';
import {
  api,
  auth0Api,
  getExtentionAuthorizationHeader,
} from 'utils/api';
import endpoints from 'configs/endpoints';
import { getRoleIdByUserId } from '../reducer';
import { userToRolesSet } from './usersActions';

export const ROLES_FETCH_SUCCESS = 'services/usersManager/ROLES_FETCH_SUCCESS';
export const ROLE_CREATE = 'services/UsersManager/ROLE_CREATE';
export const ROLE_DELETE = 'services/UsersManager/ROLE_DELETE';
export const ROLE_ASSIGN = 'services/UsersManager/ROLE_ASSIGN';
export const ROLE_UNASSIGN = 'services/UsersManager/ROLE_UNASSIGN';

const _fetchRoles = async (accessToken) => {
  const { url, method, apiVersion, extName } = endpoints.getRoles;

  const optionalHeaders = {
    optionalHeaders: getExtentionAuthorizationHeader(extName, {
      authExtAccessToken: accessToken,
    }),
  };

  return api[method](url, { apiVersion, optionalHeaders });
};

const _fetchRolesOld = async (accessToken) => {
  const { url, method, apiVersion } = endpoints.getRoles;
  const options = {
    apiVersion,
    payload: {
      access_token: accessToken,
    },
  };

  return api[method](url, options);
};

export const fetchRoles = accessToken => (dispatch) => {
  const fetchMethod = isFeatureSupported('auth0Full') ? _fetchRoles : _fetchRolesOld;

  return fetchMethod(accessToken)
    .then(res => res.json())
    .then((res) => {
      const rolesMap = {};
      const rolesList = [];
      const usersToRolesMap = {};

      res.roles.forEach((role) => {
        rolesMap[role._id] = role;
        rolesList.push(role._id);

        if (role.users) {
          role.users.forEach((user) => {
            usersToRolesMap[user] = {
              _id: role._id,
              name: role.name,
            };
          });
        }
      });

      dispatch(_rolesFetchSuccess(rolesMap, rolesList));

      if (!R.isNil(usersToRolesMap)) {
        dispatch(userToRolesSet(usersToRolesMap));
      }
    });
};

export const assignRole = (userId, role) => (dispatch) => {
  const { url, method, extName } = endpoints.assignRoleToUser(userId);
  const payload = [role];

  return auth0Api[method](url, { payload, extName })
    .then(() => dispatch(_assignRoleToUser(userId, role)));
};

export const unassignRole = userId => (dispatch, getState) => {
  const roleId = getRoleIdByUserId(getState(), userId);

  if (!roleId) return Promise.resolve();

  const { url, method, extName } = endpoints.unassignRoleToUser(userId);
  const payload = [roleId];

  return auth0Api[method](url, { payload, extName })
    .then(() => (
      dispatch(_unassignRoleToUser(userId, roleId))
    ));
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

const _unassignRoleToUser = (userId, roleId) => ({
  type: ROLE_UNASSIGN,
  userId,
  roleId,
});
