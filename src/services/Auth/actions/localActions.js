import { replace } from 'react-router-redux';
import { LOCAL_STORAGE_SESSION_KEY, useLegacy } from 'configs';
import VERSIONS from 'configs/versions';
import {
  storage,
  createBaseUrl,
} from 'utils';
import { getIsUserAuthenticated } from '../reducer';
import { loginActions, commonActions } from './';
import { getFleetName } from 'services/UserModel/reducer';

export const checkUserAuthentication = (params) => (dispatch, getState) =>
  _checkUserAuthentication(params, dispatch, getState);

function _checkUserAuthentication(params, dispatch, getState) {
  const fleet = getFleetName(getState());

  // for case when no auth data was saved in localStorage
  if (getIsUserAuthenticated(getState())) {
    return Promise.resolve(true);
  }

  return storage.read(LOCAL_STORAGE_SESSION_KEY)
  .then(_checkVersion(params.checkVersion))
  .then(sessions => {
    let isAuthenticated = false;

    if (sessions && typeof sessions === 'string') {
      dispatch(commonActions.setAuthentication(sessions));
      isAuthenticated = true;
    } else if (sessions) {
      if (sessions.length !== 0) {
        // assuming first value is correct
        // TODO -- deprecate multi-login functionality
        const session = sessions[0];
        isAuthenticated = true;
        dispatch(loginActions.loginSuccess(session));
      } else {
        isAuthenticated = false;
        dispatch(commonActions.eraseAuth());

        if (params.urls) {
          dispatch(replace(`${createBaseUrl(fleet)}/${params.urls.failure}`));
        }
      }
    } else {
      dispatch(commonActions.eraseAuth());

      if (params.urls) {
        dispatch(replace(`${createBaseUrl(fleet)}/${params.urls.failure}`));
      }

      return Promise.resolve(isAuthenticated);
    }

    return Promise.resolve(isAuthenticated);
  }, (error) => {
    if (error.message && error.message === 'wrong version') {
      const loginUrl = `${createBaseUrl()}/login`;

      console.warn(error.message);

      dispatch(commonActions.eraseAuth());

      if (params.urls) {
        dispatch(replace(loginUrl));
      }
    }

    return Promise.resolve(false);
  });
}

const _checkVersion = (needChecking = true) => (savedData) => {
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
