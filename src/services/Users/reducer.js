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
