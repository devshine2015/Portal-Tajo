import globalizeSelectors from 'utils/globalizeSelectors';
import { reducerKey } from './reducer';
import { reducerKey as usersReducerKey } from './reducers/users';
import { reducerKey as permissionsReducerKey } from './reducers/permissions';
import { reducerKey as rolesReducerKey } from './reducers/roles';
import { reducerKey as readyStateReducerKey } from './reducers/readyState';

const usersLocalState = state => state.getIn([reducerKey, usersReducerKey]);
const rolesLocalState = state => state.getIn([reducerKey, rolesReducerKey]);
const permissionsLocalState = state => state.getIn([reducerKey, permissionsReducerKey]);
const readyStateLocalState = state => state.getIn([reducerKey, readyStateReducerKey]);

// local selectors
export const getUsers = state => state.get('usersList');
export const getRoles = state => state.get('map');
export const getReadyState = state => state.get('isReady');
export const getPermissions = state => state.get('map');
export const getPermissionsList = state => state.get('list');

export const usersSelectors = globalizeSelectors(usersLocalState, {
  getUsers,
});
export const rolesSelectors = globalizeSelectors(rolesLocalState, {
  getRoles,
});
export const permissionsSelectors = globalizeSelectors(permissionsLocalState, {
  getPermissions,
  getPermissionsList,
});
export const readyStateSelectors = globalizeSelectors(readyStateLocalState, {
  getReadyState,
});
