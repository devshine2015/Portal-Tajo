import { isTokenExpired } from './checkExpiration';

/**
 *
 * Users, authenticated via auth0 has
 * id_token and access_token inside session data.
 *
 **/
function sessionHasJWT(session) {
  return Object.hasOwnProperty.call(session, 'id_token');
}

function validateSession(session) {
  const hasJWT = sessionHasJWT(session);

  // don't validate regular sessions
  if (hasJWT) {
    const tokenExpired = isTokenExpired(session.id_token);

    if (tokenExpired) {
      return Promise.reject();
    }
  }

  return Promise.resolve(session);
}

export default validateSession;
