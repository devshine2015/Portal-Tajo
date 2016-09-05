import { replace } from 'react-router-redux';
import { VERSIONS } from 'configs';
import {
  storage,
  constants,
  createBaseUrl,
} from 'utils';
import { getAuthenticatedFleet } from '../reducer';
import {
  setUserAuthentication,
  resetUserAuthentication,
} from './commonActions';
import { getFleetName } from 'services/Global/reducer';

export const checkUserAuthentication = (params) => (dispatch, getState) =>
  _checkUserAuthentication(params, dispatch, getState);

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
