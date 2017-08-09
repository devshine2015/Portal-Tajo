import R from 'ramda';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import isTokenExpired from './tokenHelpers';

const getIdToken = R.prop('id_token');
const isProfileValid = R.compose(R.not, isTokenExpired, getIdToken);

export const login = async (username, password) => {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload: {
      username,
      password,
    },
  };

  try {
    const profile = await api[method](url, options).then(res => res.json());

    if (!isProfileValid(profile)) throw new Error('Token is invalid');

    return profile;
  } catch (err) {
    throw new Error(err);
  }
};

export const logout = async (accessToken) => {
  const { url, method, apiVersion } = endpoints.logout(accessToken);
  const options = { apiVersion };

  try {
    const result = await api[method](url, options);

    return result.status === 200;
  } catch (err) {
    console.error(err);

    throw Error(err);
  }
};
