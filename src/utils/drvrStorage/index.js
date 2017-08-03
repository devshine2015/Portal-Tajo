import Storage from 'react-native-storage';
import R from 'ramda';

/**
 * Creates new storage system
 */
class DrvrStorage {
  /**
   * Hold a link to global object which has .drvrStorage
   * @static
   */
  storage = null;

  PROFILE_SCHEMA_VERSION = 2.51;

  /**
   * Initialise storage system with platphorm-specific settings.
   *
   * @param {*} storageSystem - what to use as the storage mechanism.
   * For example, for react-native it could be AsyncStorage,
   * for web it'll be window.localStorage
   */
  init(storageSystem) {
    this.storage = new Storage({
      storageBackend: storageSystem,
      defaultExpires: null, // we need to verify token expiration after reading
      enableCache: true,
    });

    return this.storage;
  }

  async load(key) {
    return this.storage.load({
      key,
      autoSync: false,
    }).then(this.verifyVersion);
  }

  async save(key, data, appendVersion = false) {
    let savedData;

    try {
      savedData = await this.load(key);
    } catch (err) {
      if (R.propEq('NotFoundError', err)) {
        savedData = {};
      }
    }

    if (appendVersion) {
      savedData.profile = data;
      savedData.ver = this.PROFILE_SCHEMA_VERSION;
    } else {
      savedData = data;
    }

    this.storage.save({
      key,
      data: savedData,
    });

    return savedData;
  }

  async remove(key) {
    return this.storage.remove({ key });
  }

  verifyVersion = (savedData = {}) => {
    const version = R.prop('ver', savedData);

    if (R.isNil(version)) {
      return savedData;
    }

    if (version !== this.PROFILE_SCHEMA_VERSION) {
      throw new Error('Saved data schema version is outdated.');
    }

    return savedData;
  }
}

const storage = new DrvrStorage();

export default storage;
