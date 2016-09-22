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
  const { url, method } = endpoints.login;
  const options = {
    payload: data,
  };

  return api[method](url, options)
    .then(response => response.text())
    .then(token => {
      const fleet = getFleetName(getState());
      const sessionData = {
        fleet,
        'session-id': token,
        id: token,
        role: 'installer', //setup lowest possible role by default
      };

      storage.save(LOCAL_STORAGE_SESSION_KEY, sessionData, VERSIONS.authentication.currentVersion);
      dispatch(commonActions.setAuthentication(token, fleet));
      dispatch(setUserData({
        role: sessionData.role,
      }));
      dispatch(push(`${createBaseUrl(fleet)}/`));
    })
    .catch(error => {
      console.error(error);
    });
}

function _logout({ redirectUrl }, dispatch, getState) {
  const { url, method } = endpoints.logout;
  const sessionId = getAuthenticationSession(getState());

  return api[method](url)
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
