import R from 'ramda';

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
  updateProfileInLocalStorage,
  removeProfilePropsInLocalStorage,
};
