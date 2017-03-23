import { auth0Api } from 'utils/api';
import endpoints from 'configs/endpoints';

export const USERS_MANAGER_USERS_SET = 'portal/UsersManager/USERS_MANAGER_USERS_SET';
export const USERS_MANAGER_USER_CREATED = 'portal/UsersManager/USERS_MANAGER_USER_CREATED';
export const USERS_MANAGER_USER_DELETED = 'portal/UsersManager/USERS_MANAGER_USER_DELETED';
export const USERS_MANAGER_PERMISSION_ASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_ASSIGN';
export const USERS_MANAGER_PERMISSION_UNASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_UNASSIGN';
export const USERS_MANAGER_USER_UPDATED = 'portal/UsersManager/USERS_MANAGER_USER_UPDATED';

export const fetchUsers = () => dispatch => {
  const { url, method } = endpoints.getAllUsers;

  return auth0Api[method](url)
    .then(toJson)
    .then(users => dispatch(_usersSet(users)));
};

export const createUser = payload => dispatch => {
  const { url, method } = endpoints.createUser;

  const enrichedPayload = Object.assign({}, payload, {
    connection: 'Username-Password-Authentication',
  });

  return auth0Api[method](url, enrichedPayload)
    .then(toJson)
    .then(user => {
      dispatch(_userCreated(user));

      return Promise.resolve();
    });
};

export const deleteUser = userId => dispatch => {
  const { url, method } = endpoints.deleteUser(userId);

  return auth0Api[method](url)
    .then(res => {
      if (res.status === 204) {
        dispatch(_userDeleted(userId));
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
  const { url, method } = endpoints.updateUser(userId);

  return auth0Api[method](url, payload)
    .then(toJson);
}

export const changeEmail = (userId, payload) => dispatch => {
  const enrichedPayload = Object.assign({}, payload, {
    connection: 'Username-Password-Authentication',
    client_id: 'qlvnewPDcVdLge4ah7Rkp0lL9Lzikj7B',
  });

  return _updateUserCall(userId, enrichedPayload)
    .then(user => {
      dispatch(_userUpdated(user, userId));

      return Promise.resolve();
    });
};

export const changePassword = (userId, payload) => dispatch => {
  const enrichedPayload = Object.assign({}, payload, {
    connection: 'Username-Password-Authentication',
  });

  return _updateUserCall(userId, enrichedPayload)
    .then(user => {
      dispatch(_userUpdated(user, userId));

      return Promise.resolve();
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
