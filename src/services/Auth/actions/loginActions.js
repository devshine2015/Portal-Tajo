import { push } from 'react-router-redux';
import {
  api,
  constants,
  createBaseUrl,
  storage,
} from 'utils';
import {
  setUserAuthentication,
  resetUserAuthentication,
} from './commonActions';
import { getAuthenticationSession } from '../reducer';
import { getFleetName } from 'services/Global/reducer';

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
      const fleetToken = {
        fleet,
        'session-id': token,
        id: token,
      };

      storage.save(constants.LOCAL_STORAGE_SESSION_KEY, fleetToken, 2);
      dispatch(setUserAuthentication(token, fleet));
      dispatch(push(`${createBaseUrl(fleet)}/`));
    }, (error) => {
      console.error(error);
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
      dispatch(resetUserAuthentication());

      return Promise.resolve({
        fleet,
        sessionId,
      });
    });
}
