import api from 'utils/api';
import endpoints from 'configs/endpoints';

export const login = payload => {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload,
  };

  return api[method](url, options)
    .then(res => res.json());
};
