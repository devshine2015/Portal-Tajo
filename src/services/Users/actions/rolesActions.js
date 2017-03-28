import uuid from 'node-uuid';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';

export const ROLES_FETCH_SUCCESS = 'services/usersManager/ROLES_FETCH_SUCCESS';
export const ROLE_CREATE = 'services/UsersManager/ROLE_CREATE';
export const ROLE_DELETE = 'services/UsersManager/ROLE_DELETE';

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

const _rolesFetchSuccess = (rolesMap, rolesList) => ({
  type: ROLES_FETCH_SUCCESS,
  rolesMap,
  rolesList,
});

export const createRole = payload => {
  payload.id = uuid.v4();

  return ({
    type: ROLE_CREATE,
    role: payload,
  });
};

export const deleteRole = index => ({
  type: ROLE_DELETE,
  index,
});
