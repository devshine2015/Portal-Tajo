import { replace } from 'react-router-redux';
import { LOCAL_STORAGE_SESSION_KEY, ROOT_ROUTE } from 'configs';
import { getIsUserAuthenticated } from '../reducer';
import storage from 'utils/localStorage';

const LOGOUT_SUCCESS = 'portal/Auth/LOGOUT_SUCCESS';
const AUTH_SET = 'portal/Auth/AUTH_SET';
const AUTH_RESET = 'portal/Auth/AUTH_RESET';

// fleet - deprecated in new url schema
const setAuthentication = (sessionId, fleet) => ({
  type: AUTH_SET,
  sessionId,
  fleet,
});
const resetAuthentication = () => ({
  type: AUTH_RESET,
});

const logout = () => ({
  type: LOGOUT_SUCCESS,
});

const eraseAuth = () => (dispatch, getState) => {
  const isAuthenticated = getIsUserAuthenticated(getState());

  if (isAuthenticated) {
    dispatch(logout());
    dispatch(replace(`${ROOT_ROUTE}/login`));
  }

  storage.clean(LOCAL_STORAGE_SESSION_KEY);
};

export default {
  AUTH_SET,
  AUTH_RESET,
  setAuthentication,
  resetAuthentication,
  eraseAuth,
};
