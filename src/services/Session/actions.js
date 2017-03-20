import R from 'ramda';
import {
  LOCAL_STORAGE_SESSION_KEY,
  checkSetMaritime,
} from 'configs';
import storage from 'utils/localStorage';
import { getSessionToken } from './reducer';

export const SESSION_SET = 'services/Session/SESSION_SET';
export const SESSION_CLEAN = 'services/Session/SESSION_CLEAN';
export const SESSION_SETTINGS_UPDATE = 'services/Session/SESSION_SETTINGS_UPDATE';

const takeFleetName = R.propOr('', 'fleet');

export const setSession = session => dispatch => {
  // new Promise(resolve => {
  checkSetMaritime(takeFleetName(session));

  dispatch({
    type: SESSION_SET,
    session,
  });

  return Promise.resolve();
  // })
};

export const cleanSession = () => ({
  type: SESSION_CLEAN,
});

// saveToStorage - clean settings from local storage if FALSE
export const updateUserSettings = (saveToStorage = true, settings) => (dispatch, getState) => {
  const sessionId = getSessionToken(getState());

  if (!saveToStorage) {
    dispatch(_userSettingsUpdate(settings));

    return storage.removeSettingsPropsBySessionId({
      key: LOCAL_STORAGE_SESSION_KEY,
      sessionId,
      props: Object.keys(settings),
    });
  }

  return storage.updateSettingsBySessionId({
    key: LOCAL_STORAGE_SESSION_KEY,
    sessionId,
    newValue: settings,
  })
  .then(result => {
    if (result) {
      dispatch(_userSettingsUpdate(settings));
    }

    return Promise.resolve();
  });
};

export const updateLanguage = nextLang => dispatch => {
  dispatch(updateUserSettings(true, {
    lang: nextLang,
  }));
};


const _userSettingsUpdate = settings => ({
  type: SESSION_SETTINGS_UPDATE,
  settings,
});
