import { List } from 'immutable';
import {
  constants,
  storage,
} from 'utils';
import { sendData } from './formActions';

export const INSTALLER_OFFLINE_DATA_CACHED_SAVE = 'portal/installer/INSTALLER_OFFLINE_DATA_CACHED_SAVE';

export const saveLocally = (data) => (dispatch) =>
  _saveLocally(data, dispatch);
const _offlineDataCacheSave = (data) => ({
  type: INSTALLER_OFFLINE_DATA_CACHED_SAVE,
  data,
});
export const checkStorage = () => _checkStorage;
export const cleanOfflineData = indexes => dispatch =>
  _cleanOfflineData(indexes, dispatch);
export const sendFromStorage = indexes => dispatch =>
  _sendFromStorage(indexes, dispatch);

function _saveLocally(data, dispatch) {
  const dataToSave = data;

  dataToSave.id = `${data.name}_${data.license}_${data.imei}`;

  return storage.save(constants.LOCAL_STORAGE_INSTALLER_KEY, dataToSave)
  .then(savedData => {
    if (typeof savedData === 'object') {
      dispatch(_offlineDataCacheSave(savedData));
    }
  });
}

function _checkStorage(dispatch) {
  return storage.read(constants.LOCAL_STORAGE_INSTALLER_KEY)
  .then(data => {
    if (typeof data === 'object') {
      return dispatch(_offlineDataCacheSave(data));
    }

    return Promise.resolve(false);
  }, () => Promise.resolve(false));
}

function _cleanOfflineData(indexesToRemove = [], dispatch) {
  return storage.cleanExactIndexies(constants.LOCAL_STORAGE_INSTALLER_KEY, indexesToRemove)
  .then(updatedData => {
    if (typeof updatedData === 'object') {
      dispatch(_offlineDataCacheSave(updatedData));
    }
  });
}

function _sendFromStorage(indexesToSend = [], dispatch) {
  const sendEverything = indexesToSend.length === 0;

  return storage.read(constants.LOCAL_STORAGE_INSTALLER_KEY).then(offlineData => {
    let dataToSend = [];

    if (!sendEverything) {
      indexesToSend.forEach(index => {
        dataToSend.push(offlineData[index]);
      });
    } else {
      dataToSend = offlineData;
    }

    return Promise.all(dataToSend.map(data => sendData(data, dispatch)));
  }).then(() => {
    if (!sendEverything) {
      // indexesToSend === indexesTo
      return storage.cleanExactIndexies(constants.LOCAL_STORAGE_INSTALLER_KEY, indexesToSend);
    }
    return storage.clean(constants.LOCAL_STORAGE_INSTALLER_KEY);
  })
  .then(updatedData => {
    if (typeof updatedData === 'object') {
      dispatch(_offlineDataCacheSave(updatedData));
    } else if (updatedData === true) {
      dispatch(_offlineDataCacheSave(new List()));
    }
  });
}
