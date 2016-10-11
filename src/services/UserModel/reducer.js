import { fromJS } from 'immutable';
import { loginActions, commonActions } from 'services/Auth/actions';
import {
  USER_SET,
  USER_RESET,
  USER_SETTINGS_UPDATE,
} from './actions';

const initialState = fromJS({
  role: undefined,
  username: undefined,
  fleet: undefined,
  settings: {
    dateFormat: undefined,
  },
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SET:
    case loginActions.LOGIN_SUCCESS:
      return state.merge({ ...action.userData });
    case USER_RESET:
    case commonActions.LOGOUT_SUCCESS:
      return initialState;
    case USER_SETTINGS_UPDATE:
      return state.mergeIn(['settings'], action.settings);
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
export const getFleetName = state =>
  state.getIn(['user', 'fleet']);
