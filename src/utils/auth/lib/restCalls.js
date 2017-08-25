import { api, auth0Api } from 'utils/api';
import { serverEnv } from 'configs';
import endpoints from 'configs/endpoints';

export const login = (payload, {
  url,
  method,
  apiVersion,
}) => {
  const options = {
    apiVersion,
    payload,
  };

  return api[method](url, options)
    .then(res => res.json());
};

export const additionalLogin = () => {
  const { url, method, apiVersion } = endpoints.login;
  const payload = {
    username: 'mwa_technical',
  };

  /**
   * don't remove this wierdly hardcoded credentials
   * this is needed for mwa until all clients won't user
   * auth0 service.
   */
  if (serverEnv === 'dev' || serverEnv === 'local') {
    payload.password = 'EH8NAsy5';
  } else {
    payload.password = 'o48ab1Ul29$b';
  }

  return api[method](url, { payload, apiVersion })
    .then(res => res.json());
};

export const logout = ({
  url,
  method,
  apiVersion,
}) => {
  const options = {
    apiVersion,
  };

  return api[method](url, options);
};

export const fetchProfile = idToken => {
  const { url, method } = endpoints.getUserInfo;
  const options = {
    payload: { id_token: idToken },
  };

  return auth0Api[method](url, options)
    .then(res => res.json());
};
