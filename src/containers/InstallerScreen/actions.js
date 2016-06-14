import api from 'utils/api';
import { save, read } from 'utils/localStorage';
import {
  LOCAL_STORAGE_SESSION_KEY,
  LOCAL_STORAGE_DATA_KEY,
} from 'utils/constants';
import {
  updateDataOffline,
  checkStorage,
} from 'containers/OfflineData/actions';
import { showMessage } from 'containers/Message/actions';

export const FORM_SET_LOADER_STATE = 'portal/InstallerScreen/FORM_SET_LOADER_STATE';
export const FORM_SUBMIT_SUCCESS = 'portal/InstallerScreen/FORM_SUBMIT_SUCCESS';
export const FORM_SUBMIT_RESET = 'portal/InstallerScreen/FORM_SUBMIT_RESET';

export const checkIfAuthenticated = () => (dispatch) => {
  const userData = read(LOCAL_STORAGE_SESSION_KEY);

  if (userData && userData.length) {
    dispatch(checkStorage());
  }
};
export const sendData = () => () => ({});
export const submitData = (data) => (dispatch, getState) => {
  _submitData(data, getState, dispatch);
};
export const saveLocally = (data) => (dispatch) => {
  _saveLocally(data, dispatch);
};

function _submitData(data, getState, dispatch) {
  const fleet = getState().getIn(['global', 'fleet']);

  dispatch(_setLoaderState(true));

  _boundRequest(fleet, data)
  .then(() => {
    dispatch(_submitSuccess());
    dispatch(_setLoaderState(false));
    dispatch(showMessage('Succesfully sended ✓', false));
    dispatch(_submitReset());
  })
  .catch(() => {
    // save locally on connection error
    _saveLocally(data, dispatch);
    dispatch(showMessage('Something went wrong. Your data saved locally.', true));
    dispatch(_setLoaderState(false));
  });
}

function _saveLocally(data, dispatch) {
  const dataToSave = data;

  dataToSave.id = `${data.name}_${data.license}_${data.imei}`;

  save(LOCAL_STORAGE_DATA_KEY, dataToSave)
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

function _boundRequest(fleet, data) {
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

const _setLoaderState = (nextState) => ({
  type: FORM_SET_LOADER_STATE,
  nextState,
});

const _submitSuccess = () => ({
  type: FORM_SUBMIT_SUCCESS,
});

const _submitReset = () => ({
  type: FORM_SUBMIT_RESET,
});
