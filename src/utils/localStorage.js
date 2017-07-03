import R from 'ramda';

/**
 * @deprecated
 */
function _cleanExact(key, newData = []) {
  let needCleanEverything = false;

  // clean up localStorage item
  if (newData.length === 0) {
    needCleanEverything = true;
  }

  if (needCleanEverything) {
    return clean(key).then(() => Promise.resolve(newData));
  }

  try {
    // replace existing values
    window.localStorage.setItem(key, JSON.stringify(newData));

    return newData;
  } catch (e) {
    return false;
  }
}

export function read(key) {
  try {
    const savedData = window.localStorage.getItem(key);

    return Promise.resolve(JSON.parse(savedData));
  } catch (e) {
    return Promise.resolve(false);
  }
}

// save just unique data
export function save(key, value, version = undefined) {
  try {
    return read(key).then((data) => {
      const savedData = data || {};

      if (!R.has('profile')) {
        savedData.profile = {};
      }

      // update version if specified
      if (version !== undefined) {
        savedData.ver = version;
      }

      // don't save same value one more time
      savedData.profile = value;

      window.localStorage.setItem(key, JSON.stringify(savedData));

      return savedData;
    });
  } catch (e) {
    return Promise.resolve(false);
  }
}

export function clean(key) {
  try {
    window.localStorage.removeItem(key);
    return Promise.resolve(true);
  } catch (e) {
    return Promise.resolve(false);
  }
}

/**
 * @deprecated used just in offline mode foe installer, which is not used at all.
 */
export function cleanExactIndexies(key, indexesToRemove = []) {
  return read(key).then((savedData = []) => {
    indexesToRemove.forEach((i) => {
      savedData.splice(i, 1);
    });

    return _cleanExact(key, savedData);
  });
}

export function updateProfileInLocalStorage({
  key, newValue, field,
} = {}) {
  return read(key).then((savedData = {}) => {
    const profile = savedData.profile;

    if (R.isNil(profile)) {
      return Promise.resolve(false);
    }

    const oldFieldVal = R.propOr({}, field)(profile);
    const newFieldVal = Object.assign({}, oldFieldVal, newValue);

    savedData.profile[field] = newFieldVal;

    window.localStorage.setItem(key, JSON.stringify(savedData));

    return Promise.resolve(true);
  });
}

function removeProfilePropsInLocalStorage({
  key, props = [], field,
} = {}) {
  return read(key).then((savedData = {}) => {
    const profile = savedData.profile;

    if (R.isNil(profile)) {
      return Promise.resolve(false);
    }

    const fieldValue = R.propOr({}, field)(profile);

    props.forEach((p) => {
      delete fieldValue[p];
    });

    savedData.profile[field] = fieldValue;

    window.localStorage.setItem(key, JSON.stringify(savedData));

    return Promise.resolve(true);
  });
}

export default {
  read,
  save,
  clean,
  cleanExactIndexies,
  updateProfileInLocalStorage,
  removeProfilePropsInLocalStorage,
};
