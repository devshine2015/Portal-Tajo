import api from 'utils/api';
import endpoints from 'configs/endpoints';
import { getUsers } from './reducer';

export const USERS_MANAGER_USERS_SET = 'portal/UsersManager/USERS_MANAGER_USERS_SET';
export const USERS_MANAGER_GROUPBY_UPDATE = 'portal/UsersManager/USERS_MANAGER_GROUPBY_UPDATE';

export const fetchUsers = groupBy => dispatch => {
  const { url, method, apiVersion } = endpoints.getAllUsers;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(users => {
      users.sort((a, b) => _sortByGrouping(groupBy, a, b));

      const grouped = _changeGroupBy(groupBy, users);

      dispatch(_usersSet(users, grouped));
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
  type: USERS_MANAGER_GROUPBY_UPDATE,
  groupBy,
  grouped,
});

function _group(groupBy, user, index) {
  if (!this[user[groupBy]]) {
    this[user[groupBy]] = [];
  }

  this[user[groupBy]].push(index);
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
