import { replace, push } from 'react-router-redux';
import {
  api,
  createBaseUrl,
  constants,
  storage,
} from 'utils';
import { getFleetName, getAuthenticationSession } from '../reducer';

export const GLOBAL_AUTH_SET = 'portal/App/GLOBAL_AUTH_SET';
export const GLOBAL_AUTH_RESET = 'portal/App/GLOBAL_AUTH_RESET';

export const login = (data) => (dispatch, getState) =>
  _login(data, dispatch, getState);
export const logout = () => (dispatch, getState) =>
  _logout(dispatch, getState);
export const checkUserAuthentication = (urls) => (dispatch, getState) =>
  _checkUserAuthentication(urls, dispatch, getState);

export const setUserAuthentication = (sessionId) => ({
  type: GLOBAL_AUTH_SET,
  sessionId,
});
export const resetUserAuthentication = () => ({
  type: GLOBAL_AUTH_RESET,
});

function _checkUserAuthentication(urls, dispatch, getState) {
  const fleet = getFleetName(getState());

  return storage.read(constants.LOCAL_STORAGE_SESSION_KEY)
  .then((sessions = []) => {
    if (sessions) {
      const fleetSession = sessions.filter(session => session.fleet === fleet);

      if (fleetSession.length !== 0) {
        dispatch(setUserAuthentication(fleetSession[0]['session-id']));
      } else {
        dispatch(resetUserAuthentication());
        dispatch(replace(`${createBaseUrl(fleet)}/${urls.failure}`));
      }
    } else {
      dispatch(resetUserAuthentication());
      dispatch(replace(`${createBaseUrl(fleet)}/${urls.failure}`));
    }
  });
}

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

      storage.save(constants.LOCAL_STORAGE_SESSION_KEY, fleetToken);
      dispatch(setUserAuthentication(token));
      dispatch(push(`${createBaseUrl(fleet)}/`));
    }, (error) => {
      console.error(error);
    });
}

function _logout(dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/login`;
  const sessionId = getAuthenticationSession(getState());
  const optionalHeaders = {
    ['DRVR-SESSION']: sessionId,
  };

  return api.delete(url, { optionalHeaders }).then(() => {
    const loginUrl = `${createBaseUrl(fleet)}/login`;
    const toDelete = [{
      id: sessionId,
    }];

    storage.cleanExactValues(constants.LOCAL_STORAGE_SESSION_KEY, toDelete);
    dispatch(resetUserAuthentication());
    dispatch(replace(loginUrl));
  }, (error) => {
    console.error(error);
  });
}
