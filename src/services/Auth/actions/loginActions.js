import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import endpoints from 'configs/endpoints';
import VERSIONS from 'configs/versions';
import storage from 'utils/localStorage';
import api from 'utils/api';
import commonActions from './commonActions';
import { getAuthenticationSession } from '../reducer';
import { getFleetName } from 'services/Global/reducer';

export const LOGIN_SUCCESS = 'portal/Auth/LOGIN_SUCCESS';

export const login = data => dispatch =>
  _login(data, dispatch);
export const logout = (redirectUrl = '') => (dispatch, getState) =>
  _logout({ redirectUrl }, dispatch, getState);

function _login(data, dispatch) {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload: data,
  };

  return api[method](url, options)
    .then(res => res.json())
    .then(res => {
      const sessionData = collectData(res);

      storage.save(LOCAL_STORAGE_SESSION_KEY, sessionData, VERSIONS.authentication.currentVersion);
      dispatch(_loginSuccess(sessionData.sessionId, {
        role: sessionData.role,
        settings: sessionData.settings,
        fleet: sessionData.fleet,
      }));
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
function collectData(res) {
  const settings = res.settings || {};

  return {
    ...res,
    settings,
  };
}

const _loginSuccess = (sessionId, userData) => ({
  type: LOGIN_SUCCESS,
  sessionId,
  userData,
});
