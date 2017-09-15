import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import R from 'ramda';

const INVALID_STRING = 'invalid string';
const GENERAL_ERROR = 'general token decode error';

function _decode(token) {
  try {
    return jwtDecode(token);
  } catch (e) {
    if (e instanceof InvalidTokenError) {
      return INVALID_STRING;
    }
    return GENERAL_ERROR;
  }
}

function getTokenExpirationDate(decodedToken) {
  if (!decodedToken.exp) {
    return null;
  }

  // The 0 here is the key, which sets the date to the epoch
  const date = new Date(0);

  date.setUTCSeconds(decodedToken.exp);

  return date;
}

function isTokenExpired(decodedToken) {
  const date = getTokenExpirationDate(decodedToken) || null;

  if (date === null) {
    return true;
  }

  return (new Date().valueOf() > date.valueOf());
}

function isTokenValid(token) {
  if (R.isNil(token)) return false;

  const decoded = _decode(token);

  switch (decoded) {
    case INVALID_STRING: return typeof token === 'string'; // assume invalid string is a session-id
    case GENERAL_ERROR: return false;
    default: return R.compose(R.not, isTokenExpired)(decoded);
  }
}

export default function verifyToken(token) {
  return R.ifElse(R.isNil, R.always(false), isTokenValid)(token);
}
