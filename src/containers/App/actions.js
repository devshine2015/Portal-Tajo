import { LOCAL_STORAGE_SESSION_KEY } from 'utils/constants';
import { replace } from 'react-router-redux';
import localStorage from 'utils/localStorage';
import { checkStorage } from 'containers/OfflineData/actions';

export const GLOBAL_SET_FLEET = 'portal/App/GLOBAL_SET_FLEET';
export const GLOBAL_SET_USER_AUTHENTICATION = 'portal/App/GLOBAL_SET_USER_AUTHENTICATION';
export const GLOBAL_CHANGE_ONLINE_STATE = 'portal/App/GLOBAL_CHANGE_ONLINE_STATE';

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
    dispatch(replace(urls.success));
  } else {
    dispatch(setUserAuthentication(false));
    dispatch(replace(urls.failure));
  }
}

function _changeOnlineState(onLine, dispatch) {
  if (onLine) {
    checkStorage(dispatch);
  }

  dispatch(_performOnlineStateChange(onLine));
}

const _performOnlineStateChange = (onLine) => ({
  type: GLOBAL_CHANGE_ONLINE_STATE,
  onLine,
});
