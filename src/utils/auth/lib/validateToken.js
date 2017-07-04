import {
  isTokenExpired,
  getIdToken,
} from './tokenHelpers';

/**
 * Retrieves token from providet object and validates its expiration date
 * @param {Object} profile
 *
 * @returns {Object} profile if token is valid
 */
async function validateToken(profile = {}) {
  const token = await getIdToken(profile);

  // token is undefined. We need unauthenticate user
  if (!token) throw new Error('Unauthorised');

  const tokenExpired = await isTokenExpired(token);

  if (tokenExpired) throw new Error('Token has been expired');

  return profile;
}

export default validateToken;
