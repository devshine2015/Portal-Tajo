import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import validateToken from './validateToken';

export const login = (username, password) => {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload: {
      username,
      password,
    },
  };

  return api[method](url, options)
    .then(res => res.json())
    .then(validateToken)
    .then(getFullProfile);
};

export const logout = () => {
  const { url, method, apiVersion } = endpoints.logout;
  const options = { apiVersion };

  return api[method](url, options);
};

/**
 * Fetch full profile info.
 * @param {String} accessToken
 *
 * @returns {Promise}
 */
const fetchProfile = (accessToken) => {
  const { url, method, apiVersion } = endpoints.getUserInfoNext;
  const optionalHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  return api[method](url, { optionalHeaders, apiVersion })
    .then(res => res.json());
};

const getFullProfile = ({ profile, token }) => {
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
    }))
    .then((userDetails) => {
      // @userDetails has session-id property which is equal to @token.
      // since we mapping ig to @id_token there is no need for such duplication.
      delete userDetails['session-id'];

      return Object.assign({}, userDetails, {
        id_token: token,
      });
    });
};
