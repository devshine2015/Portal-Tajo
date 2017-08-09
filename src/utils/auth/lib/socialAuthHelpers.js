import drvrStorage from 'utils/drvrStorage';

export async function isAuthenticating(key) {
  let status = null;

  try {
    status = await drvrStorage.load(key);
  } catch (e) {
    if (e.name.toLowerCase() === 'notfounderror') {
      status = 0;
    }
  }

  return status === 1;
}

export function setIsAuthenticating(key) {
  drvrStorage.save(key, 1);
}

export function cleanIsAuthenticating(key) {
  drvrStorage.remove(key);
}
