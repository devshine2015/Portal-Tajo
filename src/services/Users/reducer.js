import { combineReducers } from 'redux-immutable';
import usersReducer, * as fromUsersReducer from './reducers/users';
import permissionsReducer, * as fromPermissionsReducer from './reducers/permissions';

export default combineReducers({
  users: usersReducer,
  permissions: permissionsReducer,
});

function users(state) {
  return state.getIn(['usersManager', 'users']);
}

function permissions(state) {
  return state.getIn(['usersManager', 'permissions']);
}

export const getUsers = state =>
  fromUsersReducer.getUsers(users(state));
export const getGroupBy = state =>
  fromUsersReducer.getGroupBy(users(state));
export const getGrouping = state =>
  fromUsersReducer.getGrouping(users(state));
export const getIsAddingNewUser = state =>
  fromUsersReducer.getIsAddingNewUser(users(state));
export const getIsLoading = state =>
  fromUsersReducer.getIsLoading(users(state));

export const getPermissions = state =>
  fromPermissionsReducer.getPermissions(permissions(state));
