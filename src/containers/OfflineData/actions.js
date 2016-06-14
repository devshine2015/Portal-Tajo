import { LOCAL_STORAGE_SESSION_KEY } from 'utils/constants';
import { read, cleanExact } from 'utils/localStorage';
import { sendData } from 'containers/InstallerScreen/actions';

export const OFFLINE_STORAGE_SAVE_DATA = 'portal/OfflineData/OFFLINE_STORAGE_SAVE_DATA';

export const checkStorage = () => (dispatch) => {
  _checkStorage(dispatch);
};
export const cleanOfflineData = (indexes) => (dispatch) => {
  _cleanOfflineData(indexes, dispatch);
};
export const sendFromStorage = (indexes) => (dispatch) => {
  _sendFromStorage(indexes, dispatch);
};
export const updateDataOffline = (data) => ({
  type: OFFLINE_STORAGE_SAVE_DATA,
  data,
});

function _checkStorage(dispatch) {
  const data = read(LOCAL_STORAGE_SESSION_KEY);

  if (data) dispatch(updateDataOffline(data));
}

function _sendFromStorage(indexesToSend, dispatch) {
  const offlineData = read(LOCAL_STORAGE_SESSION_KEY);
  const dataToSend = [];

  indexesToSend.forEach(index => {
    dataToSend.push(offlineData[index]);
  });

  dispatch(sendData(dataToSend));
}

function _cleanOfflineData(indexesToRemove, dispatch) {
  cleanExact(LOCAL_STORAGE_SESSION_KEY, indexesToRemove)
  .then(response => {
    dispatch(updateDataOffline(response));
  });
}
