import jwtDecode from 'jwt-decode';
import R from 'ramda';

/**
 *
 * Users, authenticated via auth0 has
 * id_token and access_token inside session data.
 *
 **/
export const getToken = R.propOr(R.prop('id_token'), 'session-id');

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
  const token = getToken(session);

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
