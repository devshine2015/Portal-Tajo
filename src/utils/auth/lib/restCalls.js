import { api, auth0Api } from 'utils/api';
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

  return auth0Api[method](url, { id_token: idToken })
    .then(res => res.json());
};
