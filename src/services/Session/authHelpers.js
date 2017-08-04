import R from 'ramda';
import drvrStorage from 'utils/drvrStorage';
import {
  BASE_URL,
  LOCAL_STORAGE_SESSION_KEY,
  setMwa,
} from 'configs';
import getHistory from 'utils/history';
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
    getHistory().push(BASE_URL);
  }

  if (overwrite) {
    drvrStorage.save(LOCAL_STORAGE_SESSION_KEY, profile, true);
  }

  __sideEffects(profile, dispatch);
};

export const onFailure = (dispatch) => {
  getHistory().replace(`${BASE_URL}/login`);
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

  dispatch(setSession(profile))
    .then(() => dispatch(fetchAccessTokens()))
    .then(() => dispatch(commonFleetActions.fetchFleet()));
}
