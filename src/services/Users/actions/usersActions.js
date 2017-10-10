import { auth0Api } from 'utils/api';
import { authorizeWithRole } from 'utils/authz';
import { profileUtils } from 'utils/auth';
import endpoints from 'configs/endpoints';
import { getFleetName } from 'services/Session/reducer';
import { updateSessionMetadata } from 'services/Session/actions';
import {
  assignRole,
  unassignRole,
} from './rolesActions';

export const USERS_MANAGER_USERS_SET = 'portal/UsersManager/USERS_MANAGER_USERS_SET';
export const USERS_MANAGER_USER_CREATED = 'portal/UsersManager/USERS_MANAGER_USER_CREATED';
export const USERS_MANAGER_USER_DELETED = 'portal/UsersManager/USERS_MANAGER_USER_DELETED';
export const USERS_MANAGER_PERMISSION_ASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_ASSIGN';
export const USERS_MANAGER_PERMISSION_UNASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_UNASSIGN';
export const USERS_MANAGER_USER_UPDATED = 'portal/UsersManager/USERS_MANAGER_USER_UPDATED';
export const USERS_MANAGER_ROLES_SET = 'portal/UsersManager/USERS_MANAGER_ROLES_SET';

const filterUsers = currentFleet => (users) => {
  const allowedToSeeAllUsers = authorizeWithRole('uber');

  if (allowedToSeeAllUsers) return users;

  return users.filter(user => profileUtils.getFleetName(user) === currentFleet);
};

export const fetchUsers = () => (dispatch, getState) => {
  const { url, method, extName } = endpoints.getAllUsers;
  const currentFleet = getFleetName(getState());

  return auth0Api[method](url, { extName })
    .then(toJson)
    .then(filterUsers(currentFleet))
    .then(users => dispatch(_usersSet(users)));
};

export const createUser = ({
  fleet,
  role,
  ...rest, // eslint-disable-line
}) => (dispatch) => {
  const { url, method, extName } = endpoints.createUser;
  const enrichedPayload = Object.assign({}, rest, {
    connection: 'Username-Password-Authentication',
  });

  if (fleet) {
    enrichedPayload.app_metadata = { fleet };
  }

  return auth0Api[method](url, { payload: enrichedPayload, extName })
    .then(toJson)
    .then((user) => {
      dispatch(_userCreated(user));
      dispatch(assignRole(user.user_id, role));

      return Promise.resolve();
    });
};

export const deleteUser = userId => (dispatch) => {
  const { url, method, extName } = endpoints.deleteUser(userId);

  return auth0Api[method](url, { extName })
    .then((res) => {
      if (res.status === 204) {
        dispatch(_userDeleted(userId));
        dispatch(unassignRole(userId));
      }

      return Promise.resolve();
    });
};

export const assignPermission = (permissionId, userIndex, isAssigned) => {
  const type = isAssigned ?
    USERS_MANAGER_PERMISSION_UNASSIGN :
    USERS_MANAGER_PERMISSION_ASSIGN;

  return ({
    index: userIndex,
    type,
    permissionId,
  });
};

function _updateUserCall(userId, payload) {
  const { url, method, extName } = endpoints.updateUser(userId);

  return auth0Api[method](url, { payload, extName })
    .then(toJson);
}

export const changeEmail = (userId, payload) => (dispatch) => {
  const enrichedPayload = Object.assign({}, payload, {
    connection: 'Username-Password-Authentication',
    client_id: 'qlvnewPDcVdLge4ah7Rkp0lL9Lzikj7B',
  });

  return _updateUserCall(userId, enrichedPayload)
    .then((user) => {
      dispatch(_userUpdated(user, userId));

      return Promise.resolve();
    });
};

/**
 * Generic place to change password
 * @param {String} userId 
 * @param {String} password 
 * @param {Boolean} forCurrentUser optional - if we updating current session
 */
export const changePassword = (userId, password, forCurrentUser = false) => (dispatch) => {
  const newVal = {
    isDefaultPassword: false,
  };

  const payload = {
    password,
    connection: 'Username-Password-Authentication',
    user_metadata: newVal,
  };

  return _updateUserCall(userId, payload)
    .then((user) => {
      if (forCurrentUser) {
        return updateSessionMetadata(newVal, dispatch);
      }

      return dispatch(_userUpdated(user, userId));
    });
};

const toJson = res => res.json();

const _usersSet = users => ({
  type: USERS_MANAGER_USERS_SET,
  users,
});

const _userCreated = user => ({
  type: USERS_MANAGER_USER_CREATED,
  user,
});

const _userDeleted = id => ({
  type: USERS_MANAGER_USER_DELETED,
  id,
});

const _userUpdated = (user, id) => ({
  type: USERS_MANAGER_USER_UPDATED,
  user,
  id,
});

export const userToRolesSet = userToRolesMap => ({
  type: USERS_MANAGER_ROLES_SET,
  map: userToRolesMap,
});
