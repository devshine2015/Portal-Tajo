import { replace } from 'react-router-redux';
import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import { resetUserData } from 'services/UserModel/actions';
import { getIsUserAuthenticated } from '../reducer';
import storage from 'utils/localStorage';

const AUTH_SET = 'portal/Auth/AUTH_SET';
const AUTH_RESET = 'portal/Auth/AUTH_RESET';

const setAuthentication = sessionId => ({
  type: AUTH_SET,
  sessionId,
});
const resetAuthentication = () => ({
  type: AUTH_RESET,
});

const eraseAuth = () => (dispatch, getState) => {
  const isAuthenticated = getIsUserAuthenticated(getState());

  if (isAuthenticated) {
    dispatch(resetAuthentication());
    dispatch(resetUserData());
    dispatch(replace('/login'));
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
