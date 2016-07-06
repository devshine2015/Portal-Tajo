import {
  constants,
  storage,
} from 'utils';
import { sendData } from './formActions';

export const INSTALLER_OFFLINE_DATA_CASHED = 'portal/OfflineData/INSTALLER_OFFLINE_DATA_CASHED';

export const saveLocally = (data) => (dispatch) =>
  _saveLocally(data, dispatch);
const _cacheSavedOfflineData = (data) => ({
  type: INSTALLER_OFFLINE_DATA_CASHED,
  data,
});
export const checkStorage = () => (dispatch) =>
  _checkStorage(dispatch);
export const cleanOfflineData = (indexes) => (dispatch) =>
  _cleanOfflineData(indexes, dispatch);
export const sendFromStorage = (indexes) => (dispatch, getState) =>
  _sendFromStorage(indexes, dispatch, getState);

function _saveLocally(data, dispatch) {
  const dataToSave = data;

  dataToSave.id = `${data.name}_${data.license}_${data.imei}`;

  return storage.save(constants.LOCAL_STORAGE_INSTALLER_KEY, dataToSave)
  .then(savedData => dispatch(_cacheSavedOfflineData(savedData)));
}

function _checkStorage(dispatch) {
  return storage.read(constants.LOCAL_STORAGE_INSTALLER_KEY)
  .then(data => {
    if (data) {
      return dispatch(_cacheSavedOfflineData(data));
    }

    return Promise.resolve(false);
  }, () => Promise.resolve(false));
}

function _cleanOfflineData(indexesToRemove = [], dispatch) {
  return storage.cleanExactIndexies(constants.LOCAL_STORAGE_INSTALLER_KEY, indexesToRemove)
  .then(updatedData => {
    dispatch(_cacheSavedOfflineData(updatedData));
  });
}

function _sendFromStorage(indexesToSend = [], dispatch, getState) {
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

    return Promise.all(dataToSend.map(data => sendData(data, getState)));
  }).then(() => {
    if (!sendEverything) {
      // indexesToSend === indexesTo
      return storage.cleanExactIndexies(constants.LOCAL_STORAGE_INSTALLER_KEY, indexesToSend);
    }
    return storage.clean(constants.LOCAL_STORAGE_INSTALLER_KEY);
  })
  .then(updatedData => {
    dispatch(_cacheSavedOfflineData(updatedData));
  });
}
