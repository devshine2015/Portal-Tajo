import {
  api,
  localStorage,
  constants,
} from 'utils';
import { updateDataOffline } from 'containers/OfflineData/actions';
import { showMessage } from 'containers/Message/actions';
import { setLoaderState } from './loaderActions';

export const INSTALLER_FORM_SUBMIT_SUCCESS = 'portal/InstallerScreen/INSTALLER_FORM_SUBMIT_SUCCESS';
export const INSTALLER_FORM_SUBMIT_RESET = 'portal/InstallerScreen/INSTALLER_FORM_SUBMIT_RESET';

export const sendData = (fleet, data) => (dispatch) =>
  _sendData(fleet, data);
export const submitData = (fleet, data) => (dispatch) =>
  _submitData(data, dispatch);
export const saveLocally = (data) => (dispatch) =>
  _saveLocally(data, dispatch);

function _submitData(fleet, data, dispatch) {
  dispatch(setLoaderState(true));

  return _sendData(fleet, data).then(() => {
    dispatch(_submitSuccess());
    dispatch(setLoaderState(false));
    dispatch(showMessage('Succesfully sended ✓', false));
    dispatch(_submitReset());
  })
  .catch(() => {
    // save locally on connection error
    _saveLocally(data, dispatch);
    dispatch(showMessage('Something went wrong. Your data saved locally.', true));
    dispatch(setLoaderState(false));
  });
}

function _saveLocally(data, dispatch) {
  const dataToSave = data;

  dataToSave.id = `${data.name}_${data.license}_${data.imei}`;

  return localStorage.save(constants.LOCAL_STORAGE_DATA_KEY, dataToSave)
    .then(response => {
      dispatch(showMessage('Saved locally ✓', false));
      dispatch(updateDataOffline(response));
      dispatch(_submitSuccess());
      dispatch(_submitReset());
    })
    .catch(() => {
      dispatch(showMessage('Cannot save to your device store', true));
      dispatch(_submitReset());
    });
}

function _sendData(fleet, data) {
  const devicesUrl = `${fleet}/devices`;
  const vehiceslUrl = `${fleet}/vehicles`;
  const createDevicePayload = {
    payload: {
      id: data.imei,
      kind: 'some_kind',
      sn: data.imei,
      status: 'active',
    },
  };
  const createVehiclePayload = {
    payload: {
      created: Date.now(),
      licensePlate: data.license,
      make: 'fill_me',
      model: 'fill_me',
      name: data.name,
      status: 'active',
      year: 'fill_me',
    },
  };

  const request = api.post(devicesUrl, createDevicePayload)
    .then(() => api.post(vehiceslUrl, createVehiclePayload))
    .then(response => response.json())
    .then(vehicle => {
      const attachDeviceUrl = `${vehiceslUrl}/${vehicle.id}/device`;

      return api.post(attachDeviceUrl, {
        payload: { deviceId: data.imei },
      });
    });

  return request;
}

const _submitSuccess = () => ({
  type: INSTALLER_FORM_SUBMIT_SUCCESS,
});

const _submitReset = () => ({
  type: INSTALLER_FORM_SUBMIT_RESET,
});
