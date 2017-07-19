import Storage from 'react-native-storage';
import R from 'ramda';

/**
 * Creates new storage system
 */
class DrvrStorage {
  constructor() {
    /**
     * Hold a link to global object which has .drvrStorage
     * @static
     */
    this.storage = null;
  }

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
    });
  }

  async save(key, data) {
    let savedData;

    try {
      savedData = await this.load(key);
    } catch (err) {
      if (R.propEq('NotFoundError', err)) {
        savedData = {};
      }
    }

    if (!R.has('profile', savedData)) {
      savedData.profile = {};
    }

    // override version if specified
    if (!R.isNil(data.version)) {
      savedData.ver = data.version;
    }

    savedData.profile = data.value;

    this.storage.save({
      key,
      data: savedData,
    });

    return savedData;
  }

  async remove(key) {
    return this.storage.remove({ key });
  }
}

const storage = new DrvrStorage();

export default storage;
