import { replace, push } from 'react-router-redux';
import {
  api,
  createBaseUrl,
  constants,
  storage,
} from 'utils';
import { VERSIONS } from 'configs';
import {
  getFleetName,
  getAuthenticationSession,
  getAuthenticatedFleet,
} from '../reducer';

export const GLOBAL_AUTH_SET = 'portal/App/GLOBAL_AUTH_SET';
export const GLOBAL_AUTH_RESET = 'portal/App/GLOBAL_AUTH_RESET';

export const login = (data) => (dispatch, getState) =>
  _login(data, dispatch, getState);
export const logout = () => (dispatch, getState) =>
  _logout(dispatch, getState);
export const checkUserAuthentication = (params) => (dispatch, getState) =>
  _checkUserAuthentication(params, dispatch, getState);

export const setUserAuthentication = (sessionId, fleet) => ({
  type: GLOBAL_AUTH_SET,
  sessionId,
  fleet,
});
export const resetUserAuthentication = () => ({
  type: GLOBAL_AUTH_RESET,
});

function _checkUserAuthentication({ urls, checkVersion = true }, dispatch, getState) {
  const fleet = getFleetName(getState());

  // for case when no auth data was saved in localStorage
  if (getAuthenticatedFleet(getState()) === fleet) {
    return Promise.resolve();
  }

  return storage.read(constants.LOCAL_STORAGE_SESSION_KEY)
  .then(_checkVersion(checkVersion))
  .then((sessions = []) => {
    if (sessions && typeof sessions === 'string') {
      return dispatch(setUserAuthentication(sessions, fleet));
    } else if (sessions) {
      const fleetSession = sessions.filter(session => session.fleet === fleet);

      if (fleetSession.length !== 0) {
        dispatch(setUserAuthentication(fleetSession[0]['session-id'], fleet));
      } else {
        dispatch(resetUserAuthentication());

        if (urls) {
          dispatch(replace(`${createBaseUrl(fleet)}/${urls.failure}`));
        }
      }
    } else {
      dispatch(resetUserAuthentication());

      if (urls) {
        dispatch(replace(`${createBaseUrl(fleet)}/${urls.failure}`));
      }
    }
  }, (error) => {
    if (error.message && error.message === 'wrong version') {
      const loginUrl = `${createBaseUrl(fleet)}/login`;

      storage.clean(constants.LOCAL_STORAGE_SESSION_KEY);
      dispatch(resetUserAuthentication());

      if (urls) {
        dispatch(replace(loginUrl));
      }
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

      storage.save(constants.LOCAL_STORAGE_SESSION_KEY, fleetToken, VERSIONS.authentication.ver);
      dispatch(setUserAuthentication(token, fleet));
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

const _checkVersion = (needChecking) => (savedData) => {
  if (!needChecking) {
    return Promise.resolve(savedData);
  }

  if (VERSIONS.authentication.verify(savedData)) {
    const toReturn = savedData && savedData.hasOwnProperty('values') ? savedData.values : savedData;
    return Promise.resolve(toReturn);
  }
  return Promise.reject({ message: 'wrong version' });
};
