import { fromJS } from 'immutable';
import {
  USERS_MANAGER_PERMS_ROLES_READY_STATE_CHANGE,
  USERS_MANAGER_TOKENS_READY_STATE_CHANGE,
} from '../actions';

const initialState = fromJS({
  hasPermissionsAndRoles: false,
  hasTokens: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_MANAGER_PERMS_ROLES_READY_STATE_CHANGE:
      return state.set('hasPermissionsAndRoles', action.nextState);

    case USERS_MANAGER_TOKENS_READY_STATE_CHANGE:
      return state.set('hasTokens', action.nextState);
    default:
      return state;
  }
}

export const reducerKey = 'ready state';
