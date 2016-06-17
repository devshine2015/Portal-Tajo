import { replace } from 'react-router-redux';
import api from 'utils/api';
import { LOCAL_STORAGE_SESSION_KEY } from 'utils/constants';
import localStorage from 'utils/localStorage';
import createBaseUrl from 'utils/createBaseUrl';
import { checkStorage } from 'containers/OfflineData/actions';

export const GLOBAL_SET_FLEET = 'portal/App/GLOBAL_SET_FLEET';
export const GLOBAL_SET_USER_AUTHENTICATION = 'portal/App/GLOBAL_SET_USER_AUTHENTICATION';
export const GLOBAL_CHANGE_ONLINE_STATE = 'portal/App/GLOBAL_CHANGE_ONLINE_STATE';

export const logout = () => (dispatch, getState) => {
  _logout(dispatch, getState);
};
export const setFleet = (fleet) => ({
  type: GLOBAL_SET_FLEET,
  fleet,
});
export const checkUserAuthentication = (urls) => (dispatch) => {
  _checkUserAuthentication(urls, dispatch);
};
export const setUserAuthentication = (isAuthenticated) => ({
  type: GLOBAL_SET_USER_AUTHENTICATION,
  isAuthenticated,
});
export const changeOnlineState = (onLine) => (dispatch) => {
  _changeOnlineState(onLine, dispatch);
};

function _checkUserAuthentication(urls, dispatch) {
  const ssid = localStorage.read(LOCAL_STORAGE_SESSION_KEY);

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
}

function _changeOnlineState(onLine, dispatch) {
  if (onLine) {
    checkStorage(dispatch);
  }

  dispatch(_performOnlineStateChange(onLine));
}

function _logout(dispatch, getState) {
  const fleet = getState().getIn(['global', 'fleet']);
  const url = `${fleet}/login`;

  api.delete(url).then(() => {
    const loginUrl = `${createBaseUrl(fleet)}/login`;

    localStorage.clean(LOCAL_STORAGE_SESSION_KEY);
    dispatch(setUserAuthentication(false));
    dispatch(replace(loginUrl));
  })
  .catch(error => {
    console.error(error);
  });
}

const _performOnlineStateChange = (onLine) => ({
  type: GLOBAL_CHANGE_ONLINE_STATE,
  onLine,
});
