import { fromJS } from 'immutable';
import {
  SESSION_SET,
  SESSION_CLEAN,
  SESSION_SETTINGS_UPDATE,
  SESSION_ACCESS_TOKENS_SAVE,
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
   * tokents to external API`s
   * current user has access to
   *
   */
  accessTokens: {
    // to manage users
    mgmtApi: undefined,
    // to manage roles and permissions
    authExtApi: undefined,
  },

  id_token: undefined,

  /**
   *
   * keep roles and permissions
   * for displaying it ...later... in user profile...
   * don't rely on it for checking permissions
   * use context of AuthProvider instead.
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

    case SESSION_ACCESS_TOKENS_SAVE:
      return state.set('accessTokens', action.tokens);

    default:
      return state;
  }
}

export default reducer;

export const getProfileData = state => ({
  name: state.getIn(['session', 'name']),
  email: state.getIn(['session', 'email']),
  nickname: state.getIn(['session', 'nickname']),
  picture: state.getIn(['session', 'picture']),
  user_id: state.getIn(['session', 'user_id']),
});

export const getSessionData = state =>
  state.get('session');

export const getSessionToken = state =>
  state.getIn(['session', 'sessionId']);
export const getIdToken = state =>
  state.getIn(['session', 'id_token']);

export const getUserRole = state => {
  if (state.getIn(['session', 'roles']) !== undefined) {
    return state.getIn(['session', 'roles', 0]);
  }

  return state.getIn(['session', 'role']);
};

export const getFleetName = state => {
  if (state.getIn(['session', 'user_metadata', 'fleet']) !== undefined) {
    return state.getIn(['session', 'user_metadata', 'fleet']);
  }

  return state.getIn(['session', 'fleet']);
};
export const getUserSettings = state =>
  state.getIn(['session', 'settings']);
export const getLocale = state =>
  state.getIn(['session', 'settings', 'lang']);
export const getDateFormat = state =>
  state.getIn(['session', 'settings', 'dateFormat']);
