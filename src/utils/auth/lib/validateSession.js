import {
  isTokenExpired,
  getIdToken,
} from './tokenHelpers';

async function validateSession(session) {
  const token = await getIdToken(session);

  // token somehow is undefined. We need unauthenticate user
  if (!token) throw new Error('Unauthorised');

  const tokenExpired = await isTokenExpired(token);

  if (tokenExpired) throw new Error('Token has been expired');

  return {
    session,
    token,
  };
}

export default validateSession;
