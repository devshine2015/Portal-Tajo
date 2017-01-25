import { List } from 'immutable';
import api from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  getUsers,
  getGroupBy,
  getGrouping,
} from './reducer';

export const USERS_MANAGER_USERS_SET = 'portal/UsersManager/USERS_MANAGER_USERS_SET';
export const USERS_MANAGER_GROUPBY_CHANGE = 'portal/UsersManager/USERS_MANAGER_GROUPBY_CHANGE';
export const USERS_MANAGER_NEW_USER_TOGGLE = 'portal/UsersManager/USERS_MANAGER_NEW_USER_TOGGLE';
export const USERS_MANAGER_NEW_USER_ADD = 'portal/UsersManager/USERS_MANAGER_NEW_USER_ADD';

export const fetchUsers = groupBy => dispatch => {
  const { url, method, apiVersion } = endpoints.getAllUsers;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(users => {
      // sort alphaberically by grouping property
      users.sort((a, b) => _sortByGrouping(groupBy, a, b));

      // group users into groups
      const grouped = _changeGroupBy(groupBy, users);

      dispatch(_usersSet(users, grouped));
    });
};

export const toggleNewUser = nextState => ({
  type: USERS_MANAGER_NEW_USER_TOGGLE,
  isLoading: false,
  nextState,
});

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
    .then(() => {
      dispatch(toggleNewUser(false));

      return Promise.resolve(true);
    }, () => {
      // retain changes on error
      dispatch(_newUserAdd(users, grouped, false));

      return Promise.resolve(false);
    });
};

export const changeGroupBy = newGroupBy => (dispatch, getState) => {
  const users = getUsers(getState());
  const grouped = _changeGroupBy(newGroupBy, users);

  dispatch(_usersGroupUpdate(newGroupBy, grouped));
};

function _changeGroupBy(groupBy, users) {
  const grouped = {};

  users.forEach((user, i) => _group.call(grouped, groupBy, user, i));

  return grouped;
}

const _usersSet = (users, grouped) => ({
  type: USERS_MANAGER_USERS_SET,
  users,
  grouped,
});

const _usersGroupUpdate = (groupBy, grouped) => ({
  type: USERS_MANAGER_GROUPBY_CHANGE,
  groupBy,
  grouped,
});

const _newUserAdd = (users, grouped, isLoading) => ({
  type: USERS_MANAGER_NEW_USER_ADD,
  users,
  grouped,
  isLoading,
});

// create object:
// if groupBy = fleet
// {
//    psl: List([0,3,5]),
//    test: List([1,2,4,6]),
// }
function _group(groupBy, user, index) {
  const groupProp = user[groupBy];
  let list = this[groupProp];

  if (!list) {
    list = new List();
  }

  this[groupProp] = list.push(index);
}

function _sortByGrouping(groupingProp, a, b) {
  const propA = a[groupingProp].toLowerCase();
  const propB = b[groupingProp].toLowerCase();

  if (propA < propB) {
    return -1;
  }

  if (propA > propB) {
    return 1;
  }

  return 0;
}
