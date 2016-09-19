import { replace } from 'react-router-redux';
import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import { resetUserData } from 'services/UserModel/actions';
import { getFleetName } from 'services/Global/reducer';
import { getIsUserAuthenticated } from '../reducer';
import createBaseUrl from 'utils/createBaseUrl';
import storage from 'utils/localStorage';

const AUTH_SET = 'portal/App/AUTH_SET';
const AUTH_RESET = 'portal/App/AUTH_RESET';

const setAuthentication = (sessionId, fleet) => ({
  type: AUTH_SET,
  sessionId,
  fleet,
});
const resetAuthentication = () => ({
  type: AUTH_RESET,
});

const eraseAuth = () => (dispatch, getState) => {
  const fleetName = getFleetName(getState());
  const isAuthenticated = getIsUserAuthenticated(getState());

  if (isAuthenticated) {
    dispatch(resetAuthentication());
    dispatch(resetUserData());
    dispatch(replace(`${createBaseUrl(fleetName)}/login`));
    storage.clean(LOCAL_STORAGE_SESSION_KEY);
  }
};

export default {
  AUTH_SET,
  AUTH_RESET,
  setAuthentication,
  resetAuthentication,
  eraseAuth,
};
