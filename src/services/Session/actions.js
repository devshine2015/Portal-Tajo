import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import storage from 'utils/localStorage';
import { getSessionToken } from './reducer';

export * as loginActions from './lol/loginActions';

export const SESSION_SET = 'services/Session/SESSION_SET';
export const SESSION_CLEAN = 'services/Session/SESSION_CLEAN';
export const SESSION_SETTINGS_UPDATE = 'services/Session/SESSION_SETTINGS_UPDATE';

export const setSession = session => ({
  type: SESSION_SET,
  session,
});

export const cleanSession = () => ({
  type: SESSION_CLEAN,
});

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
