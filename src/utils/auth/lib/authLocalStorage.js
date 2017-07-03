import R from 'ramda';
import {
  read,
  save,
  clean,
} from 'utils/localStorage';
import versions from 'configs/versions';
import validateToken from './validateToken';

/**
 *
 * read local storage,
 * and return its content.
 *
 * Will return FALSE if schema of stored data
 * doesn't coincide with the version supported by
 * running codebase version.
 *
 * Legacy stuff:
 *  1. assume that session contant could be just a token string, Return string.
 *  2. Session is an array of sessions for other fleets.
 *     But actually it can be one session - one fleet.
 *     Return VALUES content;
 *
 **/

export const readSessionFromLocalStorage = localStorageKey =>
  read(localStorageKey)
    .then(_checkVersion)
    .then(validateToken);

export const saveSession = (localStorageKey, session) =>
  save(localStorageKey, session, versions.authentication.currentVersion);

export const cleanLocalStorage = localStorageKey => clean(localStorageKey);

const _getSavedProfile = R.prop('profile');
const _checkVersion = (savedData = null) => {
  if (R.isNil(savedData)) return Promise.reject('Unauthorised');

  if (versions.authentication.verify(savedData)) {
    return Promise.resolve(_getSavedProfile(savedData));
  }

  return Promise.reject({ message: 'wrong version' });
};

