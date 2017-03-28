import R from 'ramda';
import {
  LOCAL_STORAGE_SESSION_KEY,
  checkSetMaritime,
} from 'configs';
import endpoints from 'configs/endpoints';
import { api, auth0Api } from 'utils/api';
import storage from 'utils/localStorage';
import { getSessionToken } from './reducer';

export const SESSION_SET = 'services/Session/SESSION_SET';
export const SESSION_CLEAN = 'services/Session/SESSION_CLEAN';
export const SESSION_SETTINGS_UPDATE = 'services/Session/SESSION_SETTINGS_UPDATE';
export const SESSION_ACCESS_TOKENS_SAVE = 'services/Session/SESSION_ACCESS_TOKENS_SAVE';

const takeFleetName = R.propOr('', 'fleet');

export const setSession = session => dispatch => {
  checkSetMaritime(takeFleetName(session));

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
export const updateUserSettings = (saveToStorage = true, settings) => (dispatch, getState) => {
  const sessionId = getSessionToken(getState());

  if (!saveToStorage) {
    dispatch(_userSettingsUpdate(settings));

    return storage.removePropsBySessionId({
      key: LOCAL_STORAGE_SESSION_KEY,
      sessionId,
      props: Object.keys(settings),
      field: 'settings',
    });
  }

  return storage.updatePropBySessionId({
    key: LOCAL_STORAGE_SESSION_KEY,
    sessionId,
    newValue: settings,
    field: 'settings',
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

const _fetchAuthExtentionAccessToken = () => {
  const { url, method, apiVersion } = endpoints.getAuthExtentionAccessToken;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(res => {
      auth0Api.setAuthExtAccessToken(res);

      return Promise.resolve(res);
    });
};

const _fetchMgmtExtentionAccessToken = () => {
  const { url, method, apiVersion } = endpoints.getMgmtExtentionAccessToken;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(res => {
      auth0Api.setMgmtAccessToken(res);

      return Promise.resolve(res);
    });
};

export const fetchAccessTokens = () => dispatch => {
  const tokens ={};
  const cacheToken = (token, name) => {
    if (token.access_token) {
      tokens[name] = token;
    }
  };

  return _fetchAuthExtentionAccessToken()
    .then(token => {
      cacheToken(token, 'authExtApi');

      return _fetchMgmtExtentionAccessToken();
    })
    .then(token => {
      cacheToken(token, 'mgmtApi');
    })
    .then(() => {
      dispatch(_accessTokensSet(tokens));

      return Promise.resolve(tokens);
    });
};


const _userSettingsUpdate = settings => ({
  type: SESSION_SETTINGS_UPDATE,
  settings,
});

const _accessTokensSet = tokens => ({
  type: SESSION_ACCESS_TOKENS_SAVE,
  tokens,
});
