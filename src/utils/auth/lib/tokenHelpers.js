import jwtDecode from 'jwt-decode';

function _decode(token) {
  let decoded;

  try {
    decoded = jwtDecode(token);
  } catch (e) {
    return null;
  }

  return decoded;
}

function getTokenExpirationDate(token) {
  const decoded = _decode(token);

  if (!decoded.exp) {
    return null;
  }

  // The 0 here is the key, which sets the date to the epoch
  const date = new Date(0);

  date.setUTCSeconds(decoded.exp);

  return date;
}

export default function isTokenExpired(token = undefined) {
  const date = token ? getTokenExpirationDate(token) : null;

  if (date === null) {
    return true;
  }

  return (new Date().valueOf() > date.valueOf());
}
