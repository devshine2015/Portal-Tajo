import R from 'ramda';
import drvrStorage from 'utils/localStorageNext';
import versions from 'configs/versions';
import validateToken from './validateToken';

/**
 * Read data from local storage, veryfing its version and
 * token expiration date
 * @param {String} localStorageKey - key to local storage entry
 *
 * @returns {Promise} which represents an profile object
 */
export const readSessionFromLocalStorage = localStorageKey =>
  drvrStorage.load(localStorageKey)
    .then(_checkVersion)
    .then(validateToken);

/**
 * Saves profile to localStorage to provided key
 * Also adding version of current authentication mechanism
 * for later verification, ie. on page reload
 * @param {String} localStorageKey
 * @param {Object} profile
 */
export const saveProfile = (localStorageKey, profile) =>
  drvrStorage.save(localStorageKey, profile, versions.authentication.currentVersion);

/**
 * @interface
 * @param {String} key - key to local storage entry
 */
export const cleanLocalStorage = drvrStorage.remove;

const savedProfile = R.prop('profile');

/**
 * Verify version of stored data againt version of currently
 * running codebase
 * @param {Object|null} savedData - data read from local storage
 *
 * @returns {Object} if version is ok.
 */
const _checkVersion = (savedData = null) => {
  if (R.isNil(savedData)) throw new Error('Unauthorised');

  if (!versions.authentication.verify(savedData)) {
    throw new Error('Wrong version');
  }

  return savedProfile(savedData);
};

