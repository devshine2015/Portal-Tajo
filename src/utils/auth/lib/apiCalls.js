import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import verifyToken from './tokenHelpers';
import {
  isLegacyProfile,
  getIdToken,
  getSessionId,
} from './profileUtils';

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
    const token = isLegacyProfile(profile) ? getSessionId(profile) : getIdToken(profile);

    if (!verifyToken(token)) throw new Error('Token is invalid');

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
