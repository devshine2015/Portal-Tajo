import { fromJS } from 'immutable';
import {
  SESSION_SET,
  SESSION_CLEAN,
  SESSION_SETTINGS_UPDATE,
} from './actions';

const initialState = fromJS({
  fleet: undefined,
  settings: {
    dateFormat: undefined,
    lang: undefined,
  },

  /**
   * token to interact with auth0 services directly
   * or @since all clients will be moved to auth0
   * it's going to replace sessionId as a authorization token in requests header
   */
  idToken: undefined,

  /**
   *
   * keep roles and permissions
   * for displaying it ...later... in user profile...
   * don't rely on it for checking permissions
   *
   **/
  roles: undefined,
  permissions: undefined,
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

export const getProfile = state =>
  state.get('session');

export const getProfileData = state => ({
  name: state.getIn(['session', 'name']),
  email: state.getIn(['session', 'email']),
  nickname: state.getIn(['session', 'nickname']),
  picture: state.getIn(['session', 'picture']),
  user_id: state.getIn(['session', 'user_id']),
});

export const getSessionData = state =>
  state.get('session');

export const getIdToken = state =>
  state.getIn(['session', 'idToken']);

export const getUserRole = state =>
  state.getIn(['session', 'roles', 0]);

export const getFleetName = (state) => {
  if (state.getIn(['session', 'app_metadata', 'fleet']) !== undefined) {
    return state.getIn(['session', 'app_metadata', 'fleet']);
  }

  return state.getIn(['session', 'fleet']);
};
export const getUserSettings = state =>
  state.getIn(['session', 'settings']);
export const getLocale = state =>
  state.getIn(['session', 'settings', 'lang']);
export const getDateFormat = state =>
  state.getIn(['session', 'settings', 'dateFormat']);
