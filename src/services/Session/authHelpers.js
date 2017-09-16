import R from 'ramda';
import drvrStorage from 'utils/drvrStorage';
import {
  isFeatureSupported,
  DRVR_PROFILE_KEY,
  DRVR_PROFILE_LAST_KEY,
  setMwa,
} from 'configs';
import getHistory from 'utils/history';
import {
  api,
  auth0Api,
} from 'utils/api';
import { setAuthorization } from 'utils/authz';
import { profileUtils } from 'utils/auth';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import { commonFleetActions } from 'services/FleetModel/actions';
import { fetchRolesAndPermissions } from 'services/Users/actions';
import {
  setSession,
  cleanSession,
  fetchAccessTokens,
} from './actions';

const isItMwaProfile = R.compose(R.equals('mwa'), profileUtils.getFleetName);
const needRedirect = pathname => R.test(/\/login/, pathname) || isFeatureSupported('extraPath');
const getHeaderKey = () => isFeatureSupported('auth0Full') ? 'DRVR-TOKEN' : 'DRVR-SESSION';

export const onSuccess = (profile = {}, dispatch, {
  overwrite = true,
} = {}) => {
  if (needRedirect(window.location.pathname)) {
    getHistory().push('/');
  }

  if (overwrite) {
    drvrStorage.remove(DRVR_PROFILE_LAST_KEY);
    drvrStorage.save(DRVR_PROFILE_KEY, profile, true);
  }

  setAuthorization(profile);
  api.setDrvrHeader(getHeaderKey(), profileUtils.getAuthenticationString(profile, isFeatureSupported('auth0Full')));
  api.setFleet(profileUtils.getFleetName(profile));

  __sideEffects(profile, dispatch);
};

export const onFailure = (dispatch) => {
  const path = isFeatureSupported('extraPath') || 'login';

  getHistory().replace(path);
  dispatch(cleanSession());
  drvrStorage.remove(DRVR_PROFILE_KEY);
};

export const onLogoutSuccess = async (dispatch) => {
  dispatch(cleanSession());

  const saved = await drvrStorage.load(DRVR_PROFILE_KEY);

  if (!profileUtils.isLegacyProfile(saved.profile)) {
    const toSave = {
      email: R.path(['profile', 'email'], saved),
      picture: R.path(['profile', 'picture'], saved),
    };
    await drvrStorage.save(DRVR_PROFILE_LAST_KEY, toSave);
  }

  await drvrStorage.remove(DRVR_PROFILE_KEY);

  const path = isFeatureSupported('extraPath') || 'login';

  getHistory().replace(path);
};

/**
 * Stuff which sets some global vars, API calls etc..
 * @param {Object} profile
 */
function __sideEffects(profile = {}, dispatch) {
  if (isItMwaProfile(profile)) {
    setMwa(true);
    dispatch(setReportsMWA());
  }

  initOneSignal();

  dispatch(setSession(profile))
    .then(() => dispatch(fetchAccessTokens()))
    .then((tokens) => {
      auth0Api.setAccessTokens(tokens);

      if (isFeatureSupported('auth0Full') === false) {
        return dispatch(fetchRolesAndPermissions(tokens));
      }
      return Promise.resolve();
    })
    .then(() => dispatch(commonFleetActions.fetchFleet()));
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
