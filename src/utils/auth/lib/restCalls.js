import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import validateProfile from './validateProfile';

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

    if (!validateProfile(profile)) throw new Error('Token is invalid');

    return getFullProfile(profile);
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

/**
 * Fetch full profile info.
 * @param {String} accessToken
 *
 * @returns {Promise}
 */
const fetchProfile = (accessToken) => {
  const { url, method, apiVersion } = endpoints.getUserInfo;
  const optionalHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  return api[method](url, { optionalHeaders, apiVersion })
    .then(res => res.json());
};

const getFullProfile = (profile) => {
  return fetchProfile(profile.access_token)
    .then(({
      nickname,
      email_verified,
      name,
      updated_at,
      picture,
    }) => Object.assign({}, profile, {
      nickname,
      email_verified,
      name,
      updated_at,
      picture,
    }));
};
