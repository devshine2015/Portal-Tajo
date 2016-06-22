function _checkIfValueExist(val, list) {
  // assume same data already saved if list has entries
  let exist = false;

  for (let i = 0; i < list.length; i++) {
    if (list[i].id === val.id) {
      exist = true;
      break;
    }
  }

  return exist;
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
export function save(key, value) {
  try {
    return read(key).then((data) => {
      const savedData = data || [];

      // don't save same value one more time
      if (!_checkIfValueExist(value, savedData)) {
        savedData.push(value);
        window.localStorage.setItem(key, JSON.stringify(savedData));
      }

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

export function cleanExact(key, indexesToRemove) {
  return read(key).then((savedData = []) => {
    let needCleanEverything = false;

    indexesToRemove.forEach(i => {
      savedData.splice(i, 1);
    });

    // clean up localStorage item
    if (savedData.length === 0) {
      needCleanEverything = true;
    }

    if (needCleanEverything) {
      return clean(key).then(() => Promise.resolve(savedData));
    }

    try {
      // replace existing values
      window.localStorage.setItem(key, JSON.stringify(savedData));

      return savedData;
    } catch (e) {
      return false;
    }
  });
}

export default {
  read,
  save,
  clean,
  cleanExact,
};
