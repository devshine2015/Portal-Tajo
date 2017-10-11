import R from 'ramda';
import {
  DRVR_PROFILE_KEY,
  checkSetMaritime,
  checkSetNoIcons,
} from 'configs';
import {
  removeProfilePropsInLocalStorage,
  updateProfileInLocalStorage,
} from './localStorageHelpers';

export const SESSION_SET = 'services/Session/SESSION_SET';
export const SESSION_CLEAN = 'services/Session/SESSION_CLEAN';
export const SESSION_SETTINGS_UPDATE = 'services/Session/SESSION_SETTINGS_UPDATE';
export const SESSION_METADATA_UPDATE = 'Update session metadata';
export const SESSION_CURRENT_FLEET_CHANGE = 'change current fleet';

const takeFleetName = R.propOr('', 'fleet');

export const setSession = session => (dispatch) => {
  checkSetMaritime(takeFleetName(session));
  checkSetNoIcons(takeFleetName(session));

  dispatch({
    type: SESSION_SET,
    session,
  });

  return Promise.resolve();
};

export const cleanSession = () => ({
  type: SESSION_CLEAN,
});

// saveToStorage - clean settings from local storage if FALSE
export const updateUserSettings = (saveToStorage = true, settings) => (dispatch) => {
  if (!saveToStorage) {
    dispatch(_userSettingsUpdate(settings));

    return removeProfilePropsInLocalStorage({
      key: DRVR_PROFILE_KEY,
      props: Object.keys(settings),
      field: 'settings',
    });
  }

  return updateProfileInLocalStorage({
    key: DRVR_PROFILE_KEY,
    newValue: settings,
    field: 'settings',
  })
    .then((result) => {
      if (result) {
        dispatch(_userSettingsUpdate(settings));
      }

      return Promise.resolve();
    });
};

export const updateLanguage = nextLang => (dispatch) => {
  dispatch(updateUserSettings(true, {
    lang: nextLang,
  }));
};

/**
 * updates session with provided values and saves it to storage
 * it MUST has same schema as session in state
 * @param {Object} props - key-value pair(s)
 */
export const updateSessionMetadata = async (metadata = {}, dispatch) => {
  dispatch({
    type: SESSION_METADATA_UPDATE,
    userMetadata: metadata,
  });

  return updateProfileInLocalStorage({
    key: DRVR_PROFILE_KEY,
    newValue: metadata,
    field: 'user_metadata',
  });
};

export const updateFleetName = nextName => async dispatch => dispatch({
  type: SESSION_CURRENT_FLEET_CHANGE,
  nextFleetName: nextName,
});

const _userSettingsUpdate = settings => ({
  type: SESSION_SETTINGS_UPDATE,
  settings,
});
