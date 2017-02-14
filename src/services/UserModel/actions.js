import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import storage from 'utils/localStorage';
import { setLocale } from 'utils/i18n';
import { getAuthenticationSession } from 'services/Auth/reducer';

export const USER_SET = 'portal/services/USER_SET';
export const USER_RESET = 'portal/services/USER_RESET';
export const USER_SETTINGS_UPDATE = 'portal/services/USER_SETTINGS_UPDATE';
export const USER_FLEET_SET = 'portal/services/USER_FLEET_SET';

export const setUserData = userData => ({
  type: USER_SET,
  userData,
});

export const resetUserData = () => ({
  type: USER_RESET,
});

export const setFleetName = fleetName => ({
  type: USER_FLEET_SET,
  fleetName,
});

export const updateUserSettings = (saveToStorage, settings) => (dispatch, getState) => {
  const sessionId = getAuthenticationSession(getState());

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

const _userSettingsUpdate = settings => ({
  type: USER_SETTINGS_UPDATE,
  settings,
});

export const updateLanguage = nextLang => dispatch => {
  // mark changes as savable to local storage
  const saveToStorage = true;

  // update polyglot.locale
  setLocale(nextLang);

  dispatch(updateUserSettings(saveToStorage, {
    lang: nextLang,
  }));
};
