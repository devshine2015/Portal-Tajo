// import uuid from 'node-uuid';
import { api, auth0Api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { getRoleIdByUserId } from '../reducer';

export const ROLES_FETCH_SUCCESS = 'services/usersManager/ROLES_FETCH_SUCCESS';
export const ROLE_CREATE = 'services/UsersManager/ROLE_CREATE';
export const ROLE_DELETE = 'services/UsersManager/ROLE_DELETE';
export const ROLE_ASSIGN = 'services/UsersManager/ROLE_ASSIGN';
export const ROLE_UNASSIGN = 'services/UsersManager/ROLE_UNASSIGN';

export const fetchRoles = accessToken => dispatch => {
  const { url, method, apiVersion } = endpoints.getRoles;
  const payload = {
    access_token: accessToken,
  };
  return api[method](url, { payload, apiVersion })
    .then(res => res.json())
    .then(res => {
      const rolesMap = {};
      const rolesList = [];

      res.roles.forEach(role => {
        rolesMap[role._id] = role;
        rolesList.push(role._id);
      });

      dispatch(_rolesFetchSuccess(rolesMap, rolesList));
    });
};

export const assignRole = (userId, role = "867e817c-75dd-4ceb-9f65-ef925b65e089") => dispatch => {
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
