import { push } from 'react-router-redux';
import api from 'utils/api';
import localStorage from 'utils/localStorage';
import { SESSION_ID_STORAGE_KEY } from 'utils/constants';
import createBaseUrl from 'utils/createBaseUrl';
import { setUserAuthentication } from 'containers/App/actions';

export const login = (fleet, data) => (dispatch) => {
  _login(fleet, data, dispatch);
};

function _login(fleet, data, dispatch) {
  const loginUrl = `${fleet}/login`;

  const options = {
    payload: data,
  };

  api.post(loginUrl, options)
    .then(response => response.text())
    .then(token => {
      localStorage.save(SESSION_ID_STORAGE_KEY, token);
      setUserAuthentication(true);
      dispatch(push(`${createBaseUrl(fleet)}/dashboard`));
    });
}

