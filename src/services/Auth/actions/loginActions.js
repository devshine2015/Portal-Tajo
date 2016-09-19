import { push } from 'react-router-redux';
import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import VERSIONS from 'configs/versions';
import {
  api,
  createBaseUrl,
  storage,
} from 'utils';
import commonActions from './commonActions';
import { getAuthenticationSession } from '../reducer';
import { getFleetName } from 'services/Global/reducer';
import { setUserData } from 'services/UserModel/actions';

export const login = (data) => (dispatch, getState) =>
  _login(data, dispatch, getState);
export const logout = (redirectUrl = '') => (dispatch, getState) =>
  _logout({ redirectUrl }, dispatch, getState);

function _login(data, dispatch, getState) {
  const fleet = getFleetName(getState());
  const loginUrl = `${fleet}/login`;

  const options = {
    payload: data,
  };

  return api.post(loginUrl, options)
    .then(response => response.text())
    .then(token => {
      const sessionData = {
        fleet,
        'session-id': token,
        id: token,
        role: 'installer',
      };

      storage.save(LOCAL_STORAGE_SESSION_KEY, sessionData, VERSIONS.authentication.currentVersion);
      dispatch(commonActions.setAuthentication(token, fleet));
      dispatch(setUserData({
        role: sessionData.role,
      }));
      dispatch(push(`${createBaseUrl(fleet)}/`));
    });
}

function _logout({ redirectUrl }, dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/login`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  return api.delete(url, { optionalHeaders })
    .then(() => {
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
