import R from 'ramda';
import drvrStorage from 'utils/drvrStorage';
import {
  LOCAL_STORAGE_SESSION_KEY,
  setMwa,
} from 'configs';
import getHistory from 'utils/history';
import { setAuthorization } from 'utils/authz';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import { commonFleetActions } from 'services/FleetModel/actions';
import {
  setSession,
  cleanSession,
  fetchAccessTokens,
} from './actions';

const isItMwaProfile = R.propEq('fleet', 'mwa');
const needRedirect = R.test(/\/login/);

export const onSuccess = (profile = {}, dispatch, {
  overwrite = true,
} = {}) => {
  if (needRedirect(window.location.pathname)) {
    getHistory().push('/');
  }

  if (overwrite) {
    drvrStorage.save(LOCAL_STORAGE_SESSION_KEY, profile, true);
  }

  setAuthorization(profile);

  __sideEffects(profile, dispatch);
};

export const onFailure = (dispatch) => {
  getHistory().replace('/login');
  dispatch(cleanSession());
  drvrStorage.remove(LOCAL_STORAGE_SESSION_KEY);
};

export const onLogoutSuccess = (dispatch) => {
  getHistory().replace('/login');
  dispatch(cleanSession());
  drvrStorage.remove(LOCAL_STORAGE_SESSION_KEY);
};

/**
 * Stuff which sets some global vars, API calls etc..
 * @param {Object} profile
 */
function __sideEffects(profile = {}, dispatch) {
  const isMwaProfile = isItMwaProfile(profile);

  if (isMwaProfile) {
    setMwa(true);
    dispatch(setReportsMWA());
  }

  initOneSignal();

  dispatch(setSession(profile))
    .then(() => dispatch(fetchAccessTokens()))
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
