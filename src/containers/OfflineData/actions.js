import { LOCAL_STORAGE_DATA_KEY } from 'utils/constants';
import { read, cleanExact, clean } from 'utils/localStorage';
import { sendData } from 'containers/InstallerScreen/actions';
import { showMessage } from 'containers/Message/actions';

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
  const data = read(LOCAL_STORAGE_DATA_KEY);

  if (data) dispatch(updateDataOffline(data));
}


function _sendFromStorage(indexesToSend = [], dispatch) {
  const offlineData = read(LOCAL_STORAGE_DATA_KEY);
  const sendEverything = indexesToSend.length === 0;
  let dataToSend = [];

  if (!sendEverything) {
    indexesToSend.forEach(index => {
      dataToSend.push(offlineData[index]);
    });
  } else {
    dataToSend = offlineData;
  }

  Promise.all(dataToSend.map(data => dispatch(sendData(data))))
  .then(() => {
    dispatch(showMessage('Succesfully sended ✓', false));
    if (!sendEverything) {
      // indexesToSend === indexesTo
      return cleanExact(LOCAL_STORAGE_DATA_KEY, indexesToSend);
    }
    return clean(LOCAL_STORAGE_DATA_KEY);
  })
  .then(updatedData => {
    dispatch(updateDataOffline(updatedData));
  })
  .catch(error => {
    console.error(error);
    dispatch(showMessage('Something went wrong. Try to send later.', true));
  });
}

function _cleanOfflineData(indexesToRemove = [], dispatch) {
  cleanExact(LOCAL_STORAGE_DATA_KEY, indexesToRemove)
  .then(updatedData => {
    dispatch(updateDataOffline(updatedData));
  });
}
