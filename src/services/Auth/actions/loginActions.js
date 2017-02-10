import { LOCAL_STORAGE_SESSION_KEY, checkSetMaritime } from 'configs';
import endpoints from 'configs/endpoints';
import VERSIONS from 'configs/versions';
import storage from 'utils/localStorage';
import api from 'utils/api';
import { setLocale } from 'utils/i18n';
import commonActions from './commonActions';
import { getAuthenticationSession } from '../reducer';
import { getFleetName } from 'services/UserModel/reducer';

export const LOGIN_SUCCESS = 'portal/Auth/LOGIN_SUCCESS';

export const login = data => dispatch =>
  _login(data, dispatch);
export const logout = (redirectUrl = '') => (dispatch, getState) =>
  _logout({ redirectUrl }, dispatch, getState);

export const loginSuccess = ({
  sessionId,
  role,
  settings,
  fleet,
}) => {
  checkSetMaritime(fleet);

  if (!settings.lang) {
    // eslint-disable-next-line no-param-reassign
    settings.lang = setLocale(navigator.language);
  } else {
    setLocale(settings.lang);
  }

  return {
    type: LOGIN_SUCCESS,
    sessionId,
    userData: {
      role,
      settings,
      fleet,
    },
  };};


function _login(data, dispatch) {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload: data,
  };

  return api[method](url, options)
    .then(_extractResponse(apiVersion))
    .then(res => {
      const sessionData = collectData(res);

      storage.save(LOCAL_STORAGE_SESSION_KEY, sessionData, VERSIONS.authentication.currentVersion);
      dispatch(loginSuccess(sessionData));

      return Promise.resolve();
    }, error => {
      console.error(error);

      return Promise.reject(error);
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

function collectData(res) {
  const settings = res.settings || {};

  return {
    ...res,
    settings,
  };
}

const _extractResponse = apiVersion => res =>
  apiVersion === 1 ? res.text() : res.json();
