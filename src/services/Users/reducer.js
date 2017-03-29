import { combineReducers } from 'redux-immutable';
import usersReducer, * as fromUsersReducer from './reducers/users';
import permissionsReducer, * as fromPermissionsReducer from './reducers/permissions';
import rolesReducer, * as fromRolesReducer from './reducers/rolesReducer';

export default combineReducers({
  users: usersReducer,
  permissions: permissionsReducer,
  roles: rolesReducer,
});

function users(state) {
  return state.getIn(['usersManager', 'users']);
}

function permissions(state) {
  return state.getIn(['usersManager', 'permissions']);
}

function roles(state) {
  return state.getIn(['usersManager', 'roles']);
}

export const getUsers = state =>
  fromUsersReducer.getUsers(users(state));
export const getUsersToRolesMap = state =>
  fromUsersReducer.getUsersToRolesMap(users(state));
export const getGroupBy = state =>
  fromUsersReducer.getGroupBy(users(state));
export const getGrouping = state =>
  fromUsersReducer.getGrouping(users(state));
export const getIsLoading = state =>
  fromUsersReducer.getIsLoading(users(state));

export const getPermissions = state =>
  fromPermissionsReducer.getPermissions(permissions(state));
export const getPermissionsList = state =>
  fromPermissionsReducer.getPermissionsList(permissions(state));

export const getRolesList = state =>
  fromRolesReducer.getRolesList(roles(state));
export const getRoles = state =>
  fromRolesReducer.getRoles(roles(state));
export const getRoleIdByUserId = (state, userId) =>
  fromRolesReducer.getRoleIdByUserId(roles(state), userId);
