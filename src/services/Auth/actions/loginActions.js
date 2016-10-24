import { LOCAL_STORAGE_SESSION_KEY, useLegacy } from 'configs';
import endpoints from 'configs/endpoints';
import VERSIONS from 'configs/versions';
import storage from 'utils/localStorage';
import api from 'utils/api';
import commonActions from './commonActions';
import { getAuthenticationSession } from '../reducer';
import { getFleetName } from 'services/UserModel/reducer';

export const LOGIN_SUCCESS = 'portal/Auth/LOGIN_SUCCESS';

export const login = data => (dispatch, getState) =>
  _login(data, dispatch, getState);
export const logout = (redirectUrl = '') => (dispatch, getState) =>
  _logout({ redirectUrl }, dispatch, getState);

export const loginSuccess = ({
  sessionId,
  role,
  settings,
  fleet,
}) => ({
  type: LOGIN_SUCCESS,
  sessionId,
  userData: {
    role,
    settings,
    fleet,
  },
});


function _login(data, dispatch, getState) {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload: data,
  };

  return api[method](url, options)
    .then(_extractResponse(apiVersion))
    .then(res => {
      const sessionData = collectData(res, apiVersion);

      if (useLegacy('login')) {
        sessionData.fleet = getFleetName(getState());
      }

      storage.save(LOCAL_STORAGE_SESSION_KEY, sessionData, VERSIONS.authentication.currentVersion);
      dispatch(loginSuccess(sessionData));
      return Promise.resolve();
    })
    .catch(error => {
      console.error(error);
    });
}

function _logout({ redirectUrl }, dispatch, getState) {
  const { url, method, apiVersion } = endpoints.logout;
  const sessionId = getAuthenticationSession(getState());

  return api[method](url, { apiVersion })
    .then(() => {
      const fleet = getFleetName(getState());

      dispatch(commonActions.eraseAuth());

      return Promise.resolve({
        fleet,
        sessionId,
      });
    })
    .catch(e => {
      console.error(e);
    });
}

// after changing Login API
// we get different responce schema
function collectData(res, apiVersion) {
  const settings = res.settings || {};

  if (apiVersion === 1) {
    return {
      sessionId: res,
      role: 'manager',
      fleet:
      settings,
    };
  }

  return {
    ...res,
    settings,
  };
}

const _extractResponse = apiVersion => res =>
  apiVersion === 1 ? res.text() : res.json();
