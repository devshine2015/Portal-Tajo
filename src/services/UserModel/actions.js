import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import storage from 'utils/localStorage';
import { getAuthenticationSession } from 'services/Auth/reducer';

export const USER_SET = 'portal/services/USER_SET';
export const USER_RESET = 'portal/services/USER_RESET';
export const USER_SETTINGS_UPDATE = 'portal/services/USER_SETTINGS_UPDATE';

export const setUserData = (data) => ({
  type: USER_SET,
  data,
});

export const resetUserData = () => ({
  type: USER_RESET,
});

export const updateUserSettings = (saveToStorage, settings) => (dispatch, getState) =>
  _updateUserSettings(saveToStorage, settings, dispatch, getState);

function _updateUserSettings(saveToStorage, settings, dispatch, getState) {
  const sessionId = getAuthenticationSession(getState());

  if (!saveToStorage) {
    dispatch(_userSettingsUpdate(settings));

    return Promise.resolve();
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
}

const _userSettingsUpdate = settings => ({
  type: USER_SETTINGS_UPDATE,
  settings,
});
