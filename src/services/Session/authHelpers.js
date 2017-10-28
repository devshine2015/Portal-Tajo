import R from 'ramda';
import drvrStorage from 'utils/drvrStorage';
import {
  isFeatureSupported,
  DRVR_PROFILE_KEY,
  DRVR_PROFILE_LAST_KEY,
  setMwa,
} from 'configs';
import { isRunningOnLocalhost } from 'configs/_helpers';
import getHistory from 'utils/history';
import {
  api,
  auth0Api,
} from 'utils/api';
import endpoints from 'configs/endpoints';
import { setAuthorization } from 'utils/authz';
import { profileUtils } from 'utils/auth';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import { USERS_MANAGER_TOKENS_READY_STATE_CHANGE } from 'services/Users/actions';
import {
  reopenFleetSocket,
  closeFleetSocket,
} from 'services/FleetModel/actions/socketActions';
import {
  setSession,
  cleanSession,
} from './actions';

const isItMwaProfile = R.compose(R.equals('mwa'), profileUtils.getFleetName);
const needRedirect = pathname => R.test(/\/login/, pathname);
const getHeaderKey = () => isFeatureSupported('auth0Full') ? 'DRVR-TOKEN' : 'DRVR-SESSION';

export const onSuccess = async (profile, dispatch, getStore, bootstrapProject, options = {}) => {
  if (options.overwrite) {
    drvrStorage.remove(DRVR_PROFILE_LAST_KEY);
    drvrStorage.save(DRVR_PROFILE_KEY, profile, true);
  }

  setAuthorization(profile);
  api.setDrvrHeader(getHeaderKey(), profileUtils.getAuthenticationString(profile, isFeatureSupported('auth0Full')));
  api.setFleet(profileUtils.getFleetName(profile));

  await __sideEffects(profile, dispatch);

  if (needRedirect(window.location.pathname)) {
    getHistory().push('/');
  }

  bootstrapProject(dispatch, getStore);
};

export const onFailure = (dispatch) => {
  getHistory().replace('login');
  dispatch(cleanSession());
  drvrStorage.remove(DRVR_PROFILE_KEY);
  closeFleetSocket();
};

export const onLogoutSuccess = async (dispatch) => {
  const saved = await drvrStorage.load(DRVR_PROFILE_KEY);
  
  if (!profileUtils.isLegacyProfile(saved.profile)) {
    const toSave = {
      email: R.path(['profile', 'email'], saved),
      picture: R.path(['profile', 'picture'], saved),
    };
    await drvrStorage.save(DRVR_PROFILE_LAST_KEY, toSave);
  }

  await drvrStorage.remove(DRVR_PROFILE_KEY);

  closeFleetSocket();
  getHistory().replace('login');
  dispatch(cleanSession());
};

/**
 * Stuff which sets some global vars, API calls etc..
 * @param {Object} profile
 * @param {Function} dispatch
 */
async function __sideEffects(profile = {}, dispatch) {
  if (isItMwaProfile(profile)) {
    setMwa(true);
    dispatch(setReportsMWA());
  }

  if (!isRunningOnLocalhost()) {
    initOneSignal();
  }

  await dispatch(reopenFleetSocket());

  // backend can fetch access tokens even if
  // user doesn't legitimate auth0 user
  fetchAccessTokens(dispatch);

  // final step - saving profile to global state
  // just make sure it has been done before
  // bootstraping fleet data
  return dispatch(setSession(profile));
}

/**
 * Init OneSignal client
 */
function initOneSignal() {
  const OneSignal = window.OneSignal || [];
  const ONE_SIGNAL_APP_ID = '54d2b573-aec9-44e4-be03-9745b7724fbe';

  OneSignal.push(['init', {
    appId: ONE_SIGNAL_APP_ID,
    autoRegister: false, /* Set to true to automatically prompt visitors */
    httpPermissionRequest: {
      enable: true,
    },
    notifyButton: {
      enable: true, /* Set to false to hide */
    },
  }]);
}

const _fetchToken = (endpoint) => {
  const { url, method, apiVersion } = endpoint;

  return api[method](url, { apiVersion })
    .then(res => res.json());
};

const fetchAccessTokens = (dispatch) => {
  const tokens = {};
  const cacheToken = (token, name) => {
    if (token.access_token) {
      tokens[name] = token.access_token;
    }
  };

  return _fetchToken(endpoints.getAuthExtentionAccessToken)
    .then((token) => {
      cacheToken(token, 'authorizationExtAPI');

      return _fetchToken(endpoints.getMgmtExtentionAccessToken);
    })
    .then((token) => {
      cacheToken(token, 'managmentAPI');
      auth0Api.setAccessTokens(tokens);

      return Promise.resolve();
    })
    .then(() => {
      dispatch({
        type: USERS_MANAGER_TOKENS_READY_STATE_CHANGE,
        nextState: true,
      });
    });
};
