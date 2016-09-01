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
export const logout = (redirectUrl = '') => (dispatch, getState) =>
  _logout({ redirectUrl }, dispatch, getState);
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

function _checkUserAuthentication(params, dispatch, getState) {
  const fleet = getFleetName(getState());

  // for case when no auth data was saved in localStorage
  if (getAuthenticatedFleet(getState()) === fleet) {
    return Promise.resolve();
  }

  return storage.read(constants.LOCAL_STORAGE_SESSION_KEY)
  .then(_checkVersion(params.checkVersion))
  .then((sessions) => {
    if (sessions && typeof sessions === 'string') {
      return dispatch(setUserAuthentication(sessions, fleet));
    } else if (sessions) {
      const fleetSession = sessions.filter(session => session.fleet === fleet);

      if (fleetSession.length !== 0) {
        dispatch(setUserAuthentication(fleetSession[0]['session-id'], fleet));
      } else {
        dispatch(resetUserAuthentication());

        if (params.urls) {
          dispatch(replace(`${createBaseUrl(fleet)}/${params.urls.failure}`));
        }
      }
    } else {
      dispatch(resetUserAuthentication());

      if (params.urls) {
        dispatch(replace(`${createBaseUrl(fleet)}/${params.urls.failure}`));
      }
    }

    return Promise.resolve();
  }, (error) => {
    if (error.message && error.message === 'wrong version') {
      const loginUrl = `${createBaseUrl(fleet)}/login`;

      storage.clean(constants.LOCAL_STORAGE_SESSION_KEY);
      dispatch(resetUserAuthentication());

      if (params.urls) {
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

const _checkVersion = (needChecking) => (savedData) => {
  const toReturn = savedData && Object.hasOwnProperty.call(savedData, 'values') ?
    savedData.values : savedData;

  if (!needChecking) {
    return Promise.resolve(toReturn);
  }

  if (VERSIONS.authentication.verify(savedData)) {
    return Promise.resolve(toReturn);
  }
  return Promise.reject({ message: 'wrong version' });
};
