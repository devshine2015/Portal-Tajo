import { fromJS } from 'immutable';
import { loginActions, commonActions } from 'services/Auth/actions';
import {
  USER_SET,
  USER_RESET,
  USER_SETTINGS_UPDATE,
  USER_FLEET_SET,
} from './actions';

const initialState = fromJS({
  role: '',
  username: undefined,
  fleet: undefined,
  settings: {
    dateFormat: undefined,
    lang: 'en',
  },
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    // TODO: please, lets use USER_FLEET_SET to set a fleet
    // lets not use merge/spread
    // see below for more
    case USER_SET:
    case loginActions.LOGIN_SUCCESS:
      return state.merge({ ...action.userData });

    case USER_RESET:
    case commonActions.LOGOUT_SUCCESS:
      return initialState;

    case USER_SETTINGS_UPDATE:
      return state.mergeIn(['settings'], action.settings);

    // KB: commented this out to clear the confusion
    // fleet is set in loginActions.LOGIN_SUCCESS by merge
    // which is cryptic when you try to find where thigs are setup
    // lets not use merge/spread
    // lets just cleraly declare what are we doing/setting, value by value
    // make it easier for other people to figure out the loginActions
    // ----------
    // case USER_FLEET_SET:
    //   return state.set('fleet', action.fleetName);

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
export const getLocale = state =>
  state.getIn(['user', 'settings', 'lang']);
export const getDateFormat = state =>
  state.getIn(['user', 'settings', 'dateFormat']);

