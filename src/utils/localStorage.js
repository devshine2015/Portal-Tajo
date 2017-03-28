function _getValueById(sessionId, list) {
  const result = {};

  for (let i = 0; i < list.length; i++) {
    if (list[i].sessionId === sessionId) {
      result.value = list[i];
      result.index = i;
      break;
    }
  }

  return result;
}

function _checkIfValueExist(val, list) {
  // assume same data already saved if list has entries
  let exist = false;

  for (let i = 0; i < list.length; i++) {
    if (list[i].sessionId === val.sessionId) {
      exist = i;
      break;
    }
  }

  return exist;
}

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

      if (!savedData.hasOwnProperty('values')) {
        savedData.values = [];
      }

      // update version if specified
      if (version !== undefined) {
        savedData.ver = version;
      }

      // don't save same value one more time
      if (_checkIfValueExist(value, savedData.values) === false) {
        savedData.values.push(value);

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

export function cleanExactValues(key, values = []) {
  return read(key).then((savedData) => {
    if (!savedData) return Promise.resolve();

    values.forEach(value => {
      const indexToDelete = _checkIfValueExist(value, savedData.values);

      if (indexToDelete !== false) {
        savedData.values.splice(indexToDelete, 1);
      }
    });

    return _cleanExact(key, savedData.values);
  });
}

export function cleanExactIndexies(key, indexesToRemove = []) {
  return read(key).then((savedData = []) => {
    indexesToRemove.forEach(i => {
      savedData.splice(i, 1);
    });

    return _cleanExact(key, savedData);
  });
}

export function updatePropBySessionId({
  key, sessionId, newValue, field,
} = {}) {
  return read(key).then((savedData = []) => {
    const { value, index } = _getValueById(sessionId, savedData.values);

    if (index === undefined || !savedData.hasOwnProperty('values')) {
      return Promise.resolve(false);
    }

    const oldFieldVal = value.hasOwnProperty(field) ? value[field] : {};
    const newFieldVal = Object.assign({}, oldFieldVal, {
      ...newValue,
    });

    savedData.values[index][field] = newFieldVal;

    window.localStorage.setItem(key, JSON.stringify(savedData));

    return Promise.resolve(true);
  });
}

function removePropsBySessionId({
  key, sessionId, props = [], field,
} = {}) {
  return read(key).then((savedData = []) => {
    const { value, index } = _getValueById(sessionId, savedData.values);

    if (index === undefined || !savedData.hasOwnProperty('values')) {
      return Promise.resolve(false);
    }

    const fieldValue = value.hasOwnProperty(field) ? value[field] : {};

    props.forEach(p => {
      delete fieldValue[p];
    });

    savedData.values[index][field] = fieldValue;

    window.localStorage.setItem(key, JSON.stringify(savedData));

    return Promise.resolve(true);
  });
}

export default {
  read,
  save,
  clean,
  cleanExactIndexies,
  cleanExactValues,
  updatePropBySessionId,
  removePropsBySessionId,
};
