import { replace, push } from 'react-router-redux';
import {
  api,
  createBaseUrl,
  constants,
  localStorage,
} from 'utils';

export const GLOBAL_AUTH_SET = 'portal/App/GLOBAL_AUTH_SET';

export const login = (fleet, data) => (dispatch) =>
  _login(fleet, data, dispatch);
export const logout = (fleet) => (dispatch) =>
  _logout(fleet, dispatch);
export const checkUserAuthentication = (urls) => (dispatch) =>
  _checkUserAuthentication(urls, dispatch);

export const setUserAuthentication = (isAuthenticated) => ({
  type: GLOBAL_AUTH_SET,
  isAuthenticated,
});

function _checkUserAuthentication(urls, dispatch) {
  return localStorage.read(constants.LOCAL_STORAGE_SESSION_KEY)
  .then((ssid) => {
    if (Boolean(ssid)) {
      dispatch(setUserAuthentication(true));
      // got to {ROOT}/dashboard
      if (!/dashboard/.test(location.pathname)) {
        dispatch(replace(urls.dashboard));
      }
    } else {
      dispatch(setUserAuthentication(false));
      dispatch(replace(urls.login));
    }
  });
}

function _login(fleet, data, dispatch) {
  const loginUrl = `${fleet}/login`;

  const options = {
    payload: data,
  };

  return api.post(loginUrl, options)
    .then(response => response.text())
    .then(token => {
      localStorage.save(constants.LOCAL_STORAGE_SESSION_KEY, token);
      setUserAuthentication(true);
      dispatch(push(`${createBaseUrl(fleet)}/dashboard`));
    }, (error) => {
      console.error(error);
    });
}

function _logout(fleet, dispatch) {
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
