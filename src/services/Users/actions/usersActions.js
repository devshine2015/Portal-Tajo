import { auth0Api } from 'utils/api';
import endpoints from 'configs/endpoints';

export const USERS_MANAGER_USERS_SET = 'portal/UsersManager/USERS_MANAGER_USERS_SET';
export const USERS_MANAGER_USER_CREATED = 'portal/UsersManager/USERS_MANAGER_USER_CREATED';
export const USERS_MANAGER_USER_DELETED = 'portal/UsersManager/USERS_MANAGER_USER_DELETED';
export const USERS_MANAGER_PERMISSION_ASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_ASSIGN';
export const USERS_MANAGER_PERMISSION_UNASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_UNASSIGN';

export const fetchUsers = () => dispatch => {
  const { url, method } = endpoints.getAllUsers;

  return auth0Api[method](url)
    .then(res => res.json())
    .then(users => dispatch(_usersSet(users)));
};

export const createUser = payload => dispatch => {
  const { url, method } = endpoints.createUser;

  const enchantedPayload = Object.assign({}, payload, {
    connection: 'Username-Password-Authentication',
  });

  return auth0Api[method](url, enchantedPayload)
    .then(res => res.json())
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
// export const addNewUser = payload => (dispatch, getState) => {
//   const groupBy = getGroupBy(getState());
//   const grouped = getGrouping(getState());
//   const users = getUsers(getState());

//   // assume POST requiest will be successful
//   // update store ASAP
//   const newUsers = users.push(payload);
//   const newGrouping = grouped.update(payload[groupBy], array => (
//     array.push(newUsers.size - 1)
//   ));

//   // don't wait for request
//   dispatch(_newUserAdd(newUsers, newGrouping, true));

//   const { url, method, apiVersion } = endpoints.addNewUser;

//   return api[method](url, { payload, apiVersion })
//     .then(() => Promise.resolve(true), () => {
//       // retain changes on error
//       dispatch(_newUserAdd(users, grouped, false));

//       return Promise.resolve(false);
//     });
// };

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

export const changeEmail = (userId, payload) => dispatch => {
  const { url, method } = endpoints.updateUser(userId);

  return auth0Api[method](url, payload)
    .then(result => {
      console.log(result);
    });
};

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
