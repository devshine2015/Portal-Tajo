import { replace, push } from 'react-router-redux';
import {
  api,
  createBaseUrl,
  constants,
  localStorage,
} from 'utils';
import { getFleetName } from '../reducer';

export const GLOBAL_AUTH_SET = 'portal/App/GLOBAL_AUTH_SET';

export const login = (data) => (dispatch, getState) =>
  _login(data, dispatch, getState);
export const logout = () => (dispatch, getState) =>
  _logout(dispatch, getState);
export const checkUserAuthentication = (urls) => (dispatch, getState) =>
  _checkUserAuthentication(urls, dispatch, getState);

export const setUserAuthentication = (isAuthenticated) => ({
  type: GLOBAL_AUTH_SET,
  isAuthenticated,
});

function _checkUserAuthentication(urls, dispatch, getState) {
  const fleet = getFleetName(getState());

  return localStorage.read(constants.LOCAL_STORAGE_SESSION_KEY)
  .then((ssid) => {
    if (Boolean(ssid)) {
      dispatch(setUserAuthentication(true));
    } else {
      dispatch(setUserAuthentication(false));
      dispatch(replace(`${createBaseUrl(fleet)}/${urls.failure}`));
    }
  });
}

function _login(data, dispatch, getState) {
  const fleet = getFleetName(getState());
  const loginUrl = `${fleet}/login`;

  const options = {
    payload: data,
  };

  return api.post(loginUrl, options)
    .then(response => response.text())
    .then(token => {
      localStorage.save(constants.LOCAL_STORAGE_SESSION_KEY, token);
      setUserAuthentication(true);
      dispatch(push(`${createBaseUrl(fleet)}/`));
    }, (error) => {
      console.error(error);
    });
}

function _logout(dispatch, getState) {
  const fleet = getFleetName(getState());
  const url = `${fleet}/login`;

  return api.delete(url).then(() => {
    const loginUrl = `${createBaseUrl(fleet)}/login`;

    localStorage.clean(constants.LOCAL_STORAGE_SESSION_KEY);
    dispatch(setUserAuthentication(false));
    dispatch(replace(loginUrl));
  }, (error) => {
    console.error(error);
  });
}
