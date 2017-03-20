import { isTokenExpired } from './checkExpiration';

function validateSession(session) {
  const tokenExpired = isTokenExpired(session.sessionId);

  if (tokenExpired) {
    return Promise.reject();
  }

  return Promise.resolve(session);
}

export default validateSession;
