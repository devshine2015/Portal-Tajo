import api from 'utils/api';
import endpoints from 'configs/endpoints';

export const USERS_MANAGER_USERS_SET = 'portal/UsersManager/USERS_MANAGER_USERS_SET';

export const fetchUsers = () => dispatch => {
  const { url, method, apiVersion } = endpoints.getAllUsers;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(users => dispatch(_usersSet(users)));
};

const _usersSet = users => ({
  type: USERS_MANAGER_USERS_SET,
  users,
});
