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
  if (!window.localStorage) {
    console.warn('I cannot read from your browser`s local storage');
    return false;
  }
  const savedData = window.localStorage.getItem(key);

  return JSON.parse(savedData);
}

// save just unique data
export function save(key, value) {
  return new Promise((resolve, reject) => {
    if (!window.localStorage) {
      console.warn('I cannot write to your browser`s local storage');
      reject();
    } else {
      const savedData = read(key) || [];

      // don't save same value one more time
      if (!_checkIfValueExist(value, savedData)) {
        savedData.push(value);
        window.localStorage.setItem(key, JSON.stringify(savedData));
      }

      resolve(savedData);
    }
  });
}

export function clean(key) {
  return new Promise((resolve, reject) => {
    if (!window.localStorage) {
      console.warn('I cannot clean from your browser`s local storage');
      reject();
    } else {
      window.localStorage.removeItem(key);
      resolve();
    }
  });
}

export function cleanExact(key, indexesToRemove) {
  const savedData = read(key) || [];
  let needCleanEverything = false;

  indexesToRemove.forEach(i => {
    savedData.splice(i, 1);
  });

  if (savedData.length === 0) {
    needCleanEverything = true;
  }

  return new Promise((resolve, reject) => {
    if (needCleanEverything) {
      clean(key)
        .then(() => resolve(savedData));
    } else {
      // replace existing values
      window.localStorage.setItem(key, JSON.stringify(savedData));

      resolve(savedData);
    }
  });
}

export default {
  read,
  save,
  clean,
  cleanExact,
};
