import { fromJS } from 'immutable';
import {
  SESSION_SET,
  SESSION_CLEAN,
  SESSION_SETTINGS_UPDATE,
} from './actions';

const initialState = fromJS({
  sessionId: undefined,
  fleet: undefined,
  role: undefined,
  settings: {
    dateFormat: undefined,
    lang: undefined,
  },

  /**
   *
   * keep roles and permissions
   * for displaying it ...later... in user profile...
   * don't rely on it for checking permissions
   * use context of AuthProvider instead.
   *
   **/
  roles: [],
  permissions: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_CLEAN:
      return initialState;

    case SESSION_SET:
      return state.mergeDeep(action.session);

    case SESSION_SETTINGS_UPDATE:
      return state.mergeIn(['settings'], action.settings);

    default:
      return state;
  }
}

export default reducer;

export const getSessionData = state =>
  state.get('session');
export const getSessionToken = state =>
  state.getIn(['session', 'sessionId']);
export const getUserRole = state =>
  state.getIn(['session', 'role']);
export const getFleetName = state =>
  state.getIn(['session', 'fleet']);
export const getUserSettings = state =>
  state.getIn(['session', 'settings']);
export const getLocale = state =>
  state.getIn(['session', 'settings', 'lang']);
export const getDateFormat = state =>
  state.getIn(['session', 'settings', 'dateFormat']);
