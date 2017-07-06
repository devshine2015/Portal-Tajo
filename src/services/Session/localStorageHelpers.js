import R from 'ramda';
import drvrStorage from 'utils/drvrStorage';

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

  profile[field] = newFieldVal;

  await drvrStorage.save(key, {
    value: profile,
  });

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

  profile[field] = fieldValue;

  await drvrStorage.save(key, {
    value: profile,
  });

  return true;
}

export default {
  updateProfileInLocalStorage,
  removeProfilePropsInLocalStorage,
};
