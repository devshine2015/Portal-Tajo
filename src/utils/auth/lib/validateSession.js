import {
  isTokenExpired,
  getIdToken,
} from './tokenHelpers';

function validateSession(session) {
  const token = getIdToken(session);

  // don't validate regular sessions
  if (token) {
    const tokenExpired = isTokenExpired(token);

    if (tokenExpired) {
      return Promise.reject('token expired');
    }
  }

  return Promise.resolve({
    session,
    token,
  });
}

export default validateSession;
