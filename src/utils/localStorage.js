import R from 'ramda';
import drvrStorage from './localStorageNext';

export function read(key) {
  return drvrStorage.load(key);
}

// save just unique data
export function save(key, value, version = undefined) {
  return drvrStorage.save(key, {
    value,
    version,
  });
}

export function clean(key) {
  return drvrStorage.remove(key);
}

export async function updateProfileInLocalStorage({
  key, newValue, field,
} = {}) {
  const savedData = await drvrStorage.load(key);
  const profile = savedData.profile;

  if (R.isNil(profile)) {
    return false;
  }

  const oldFieldVal = R.propOr({}, field)(profile);
  const newFieldVal = Object.assign({}, oldFieldVal, newValue);

  savedData.profile[field] = newFieldVal;

  await drvrStorage.save(key, savedData);

  return true;
}

async function removeProfilePropsInLocalStorage({
  key, props = [], field,
} = {}) {
  const savedData = await drvrStorage.load(key);
  const profile = savedData.profile;

  if (R.isNil(profile)) {
    return false;
  }

  const fieldValue = R.propOr({}, field)(profile);

  props.forEach((p) => {
    delete fieldValue[p];
  });

  savedData.profile[field] = fieldValue;

  await drvrStorage.save(key, savedData);

  return true;
}

export default {
  read,
  save,
  clean,
  updateProfileInLocalStorage,
  removeProfilePropsInLocalStorage,
};
