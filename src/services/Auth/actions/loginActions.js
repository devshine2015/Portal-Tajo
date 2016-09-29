import { push } from 'react-router-redux';
import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import endpoints from 'configs/endpoints';
import VERSIONS from 'configs/versions';
import {
  createBaseUrl,
  storage,
} from 'utils';
import api from 'utils/api';
import commonActions from './commonActions';
import { getAuthenticationSession } from '../reducer';
import { getFleetName } from 'services/Global/reducer';
import { setUserData } from 'services/UserModel/actions';

export const login = (data) => (dispatch, getState) =>
  _login(data, dispatch, getState);
export const logout = (redirectUrl = '') => (dispatch, getState) =>
  _logout({ redirectUrl }, dispatch, getState);

function _login(data, dispatch, getState) {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload: data,
  };

  return api[method](url, options)
    .then(response => {
      if (apiVersion === 1) {
        return response.text();
      }

      return response.json();
    })
    .then(res => {
      const fleet = getFleetName(getState());
      const sessionData = collectData(apiVersion, fleet, res);

      storage.save(LOCAL_STORAGE_SESSION_KEY, sessionData, VERSIONS.authentication.currentVersion);
      dispatch(commonActions.setAuthentication(sessionData.sessionId, fleet));
      dispatch(setUserData({
        role: sessionData.role,
        settings: sessionData.settings,
      }));
      dispatch(push(`${createBaseUrl(fleet)}/`));
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
function collectData(apiVersion, fleetFromURL, res) {
  const settings = res.settings || {};

  if (apiVersion === 1.1) {
    return {
      ...res,
      settings,
    };
  }

  return {
    settings,
    fleet: fleetFromURL,
    sessionId: res,
    role: 'installer', // setup lowest possible role by default
  };
}
