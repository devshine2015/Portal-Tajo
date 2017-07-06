import {
  isTokenExpired,
  getIdToken,
} from './tokenHelpers';

/**
 * Retrieves token from providet object and validates its expiration date
 * @param {Object} profile
 *
 * @returns {Boolean} result of token validating
 */
async function validateProfile(profile = {}) {
  const token = await getIdToken(profile);

  // token is undefined. We need unauthenticate user
  if (token) {
    const tokenExpired = await isTokenExpired(token);

    if (tokenExpired) throw new Error('Token has been expired');
  }

  return Boolean(token);
}

export default validateProfile;
