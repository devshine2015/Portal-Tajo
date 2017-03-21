import api from 'utils/api';

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
