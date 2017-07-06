import R from 'ramda';
import drvrStorage from 'utils/localStorageNext';
import verifyVersion, { CURRENT_AUTH_VERSION } from './versionHelper';
import validateToken from './validateToken';

const _takeProfile = R.propOr({}, 'profile');
const _takeVersion = R.prop('ver');
const isVersionValid = R.compose(verifyVersion, _takeVersion);
/**
 * Read data from local storage, veryfing its version and
 * token expiration date
 * @param {String} localStorageKey - key to local storage entry
 *
 * @returns {Promise} which represents an profile object
 */
export const readProfileFromLocalStorage = async (localStorageKey) => {
  const savedData = await drvrStorage.load(localStorageKey);

  if (!isVersionValid(savedData)) {
    throw new Error('Wrong version');
  }

  const profile = _takeProfile(savedData);
  const isTokenValid = Boolean(validateToken(profile));

  if (!isTokenValid) throw new Error('Token has been expired');

  return profile;
};

/**
 * Saves profile to localStorage to provided key
 * Also adding version of current authentication mechanism
 * for later verification, ie. on page reload
 * @param {String} localStorageKey
 * @param {Object} profile
 */
export const saveProfile = (localStorageKey, profile) =>
  drvrStorage.save(localStorageKey, {
    value: profile,
    version: CURRENT_AUTH_VERSION,
  });

/**
 * @interface
 * @param {String} key - key to local storage entry
 */
export const cleanLocalStorage = key => drvrStorage.remove(key);
