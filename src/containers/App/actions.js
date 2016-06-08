import localStorage from 'utils/localStorage';
import { SESSION_ID_STORAGE_KEY } from 'utils/constants';
import { replace } from 'react-router-redux';

export const GLOBAL_SET_FLEET = 'portal/App/GLOBAL_SET_FLEET';
export const GLOBAL_SET_USER_AUTHENTICATION = 'portal/App/GLOBAL_SET_USER_AUTHENTICATION';

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

function _checkUserAuthentication(urls, dispatch) {
  const ssid = localStorage.read(SESSION_ID_STORAGE_KEY);

  if (Boolean(ssid)) {
    dispatch(setUserAuthentication(true));
    dispatch(replace(urls.success));
  } else {
    dispatch(setUserAuthentication(false));
    dispatch(replace(urls.failure));
  }
}
