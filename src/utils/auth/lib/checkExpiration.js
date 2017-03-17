import decode from 'jwt-decode';

export function getTokenExpirationDate(token) {
  let decoded;

  try {
    decoded = decode(token);
  } catch (e) {
    return new Date();
  }

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

  return (date.valueOf() > new Date().valueOf());
}
