import { fromJS } from 'immutable';
import {
  USER_SET,
  USER_RESET,
  USER_SETTINGS_UPDATE,
} from './actions';

const initialState = fromJS({
  role: undefined,
  username: undefined,
  settings: {},
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SET:
      return fromJS({ ...action.data });
    case USER_RESET:
      return initialState;
    case USER_SETTINGS_UPDATE:
      return state.merge('settings', action.settings);
    default:
      return state;
  }
}

export default userReducer;

export const getUserData = state =>
  state.get('user');
export const getUserRole = state =>
  state.getIn(['user', 'role']);
export const getUserSettings = state =>
  state.getIn(['user', 'settings']);
