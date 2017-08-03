import R from 'ramda';
import { browserHistory } from 'react-router';
import drvrStorage from 'utils/drvrStorage';
import {
  BASE_URL,
  LOCAL_STORAGE_SESSION_KEY,
  setMwa,
} from 'configs';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import {
  setSession,
  cleanSession,
  fetchAccessTokens,
} from './actions';

export const onSuccess = (profile = {}, dispatch, {
  overwrite = true,
} = {}) => {
  if (overwrite) {
    drvrStorage.save(LOCAL_STORAGE_SESSION_KEY, profile, true);
  }

  __sideEffects(profile, dispatch);
};

export const onFailure = (dispatch) => {
  browserHistory.replace(`${BASE_URL}/login`);
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
    .then(() => dispatch(fetchAccessTokens()));
}

const isItMwaProfile = R.propEq('fleet', 'mwa');
