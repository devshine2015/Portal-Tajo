import { combineReducers } from 'redux-immutable';
import usersReducer, { reducerKey as usersReducerKey } from './reducers/users';
import permissionsReducer, { reducerKey as permissionsReducerKey } from './reducers/permissions';
import rolesReducer, { reducerKey as rolesReducerKey } from './reducers/roles';
import readyStateReducer, { reducerKey as readyStateReducerKey } from './reducers/readyState';

export default combineReducers({
  [usersReducerKey]: usersReducer,
  [permissionsReducerKey]: permissionsReducer,
  [rolesReducerKey]: rolesReducer,
  [readyStateReducerKey]: readyStateReducer,
});

export const reducerKey = 'Users Manager';

// function users(state) {
//   return state.getIn([reducerKey, usersReducerKey]);
// }

// function permissions(state) {
//   return state.getIn([reducerKey, permissionsReducerKey]);
// }

// function roles(state) {
//   return state.getIn([reducerKey, rolesReducerKey]);
// }

// export const getUsers = state =>
//   fromUsersReducer.getUsers(users(state));
// export const getUsersToRolesMap = state =>
//   fromUsersReducer.getUsersToRolesMap(users(state));
// export const getGroupBy = state =>
//   fromUsersReducer.getGroupBy(users(state));
// export const getGrouping = state =>
//   fromUsersReducer.getGrouping(users(state));
// export const getIsLoading = state =>
//   fromUsersReducer.getIsLoading(users(state));

// export const getPermissions = state =>
//   fromPermissionsReducer.getPermissions(permissions(state));
// export const getPermissionsList = state =>
//   fromPermissionsReducer.getPermissionsList(permissions(state));

// export const getRolesList = state =>
//   fromRolesReducer.getRolesList(roles(state));
// export const getRoles = state =>
//   fromRolesReducer.getRoles(roles(state));
// export const getRoleIdByUserId = (state, userId) =>
//   fromRolesReducer.getRoleIdByUserId(roles(state), userId);
