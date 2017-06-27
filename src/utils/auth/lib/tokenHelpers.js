import jwtDecode from 'jwt-decode';
import R from 'ramda';

const tryGetSessionId = R.prop('session-id');
const tryGetIdToken = R.prop('id_token');
const hasIdToken = R.has('id_token');

/**
 * Trying to get token out of provided object, which represents user profile.
 * Since we have multiple variations of that token name in the profile.
 * session-id is temporal name of token coming from backend,
 * here we checking all possibilities: 'session-id' or 'id_token'.
 * session-id going to be renamed to id_token soon.
 */
export const getIdToken = R.ifElse(hasIdToken, tryGetIdToken, tryGetSessionId);

function _decode(token) {
  let decoded;

  try {
    decoded = jwtDecode(token);
  } catch (e) {
    return null;
  }

  return decoded;
}

export function takeProfile(session) {
  const token = getIdToken(session);

  if (token) {
    const decoded = _decode(token);

    return {
      name: decoded.name,
      email: decoded.email,
      nickname: decoded.nickname,
      email_verified: decoded.email_verified,
      picture: decoded.picture,
      user_id: decoded.sub,
    };
  }

  return session;
}

export function getTokenExpirationDate(token) {
  const decoded = _decode(token);

  if (!decoded.exp) {
    return null;
  }

  // The 0 here is the key, which sets the date to the epoch
  const date = new Date(0);

  date.setUTCSeconds(decoded.exp);

  return date;
}

export function isTokenExpired(token) {
  const date = getTokenExpirationDate(token);
  if (date === null) {
    return true;
  }

  return (new Date().valueOf() > date.valueOf());
}
