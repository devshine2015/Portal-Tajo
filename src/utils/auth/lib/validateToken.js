import {
  isTokenExpired,
  getIdToken,
} from './tokenHelpers';

async function validateToken(profile = {}) {
  const token = await getIdToken(profile);

  // token is undefined. We need unauthenticate user
  if (!token) throw new Error('Unauthorised');

  const tokenExpired = await isTokenExpired(token);

  if (tokenExpired) throw new Error('Token has been expired');

  return {
    profile,
    token,
  };
}

export default validateToken;
