import api, { auth0Api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  getUsers,
  getGroupBy,
  getGrouping,
} from '../reducer';

export const USERS_MANAGER_USERS_SET = 'portal/UsersManager/USERS_MANAGER_USERS_SET';
export const USERS_MANAGER_NEW_USER_ADD = 'portal/UsersManager/USERS_MANAGER_NEW_USER_ADD';
export const USERS_MANAGER_PERMISSION_ASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_ASSIGN';
export const USERS_MANAGER_PERMISSION_UNASSIGN = 'portal/UsersManager/USERS_MANAGER_PERMISSION_UNASSIGN';

export const fetchUsers = () => dispatch => {
  const { url, method } = endpoints.getAllUsers;

  return auth0Api[method](url)
    .then(res => res.json())
    .then(users => dispatch(_usersSet(users)));
};

export const addNewUser = payload => (dispatch, getState) => {
  const groupBy = getGroupBy(getState());
  const grouped = getGrouping(getState());
  const users = getUsers(getState());

  // assume POST requiest will be successful
  // update store ASAP
  const newUsers = users.push(payload);
  const newGrouping = grouped.update(payload[groupBy], array => (
    array.push(newUsers.size - 1)
  ));

  // don't wait for request
  dispatch(_newUserAdd(newUsers, newGrouping, true));

  const { url, method, apiVersion } = endpoints.addNewUser;

  return api[method](url, { payload, apiVersion })
    .then(() => Promise.resolve(true), () => {
      // retain changes on error
      dispatch(_newUserAdd(users, grouped, false));

      return Promise.resolve(false);
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

const _usersSet = users => ({
  type: USERS_MANAGER_USERS_SET,
  users,
});

const _newUserAdd = (users, grouped, isLoading) => ({
  type: USERS_MANAGER_NEW_USER_ADD,
  users,
  isLoading,
});
