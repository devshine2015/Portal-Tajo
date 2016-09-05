import api from 'utils/api';
import { setLoaderState } from './loaderActions';
import { getFleetName } from 'services/Global/reducer';
import { getAuthenticationSession } from 'services/Auth/reducer';

export const submitForm = (data) => (dispatch, getState) =>
  _submitForm(data, dispatch, getState);

function _submitForm(data, dispatch, getState) {
  dispatch(setLoaderState(true));

  return sendData(data, getState).then(() => {
    dispatch(setLoaderState(false));
    return Promise.resolve();
  }, (error) => {
    console.error(error);
    dispatch(setLoaderState(false));
    return Promise.reject();
  });
}

export const sendData = (data, getState) => {
  const fleet = getFleetName(getState());
  const devicesUrl = `${fleet}/devices`;
  const vehiceslUrl = `${fleet}/vehicles`;
  const sessionId = getAuthenticationSession(getState());
  const headers = {
    ['DRVR-SESSION']: sessionId,
  };
  const createDevicePayload = {
    optionalHeaders: headers,
    payload: {
      id: data.imei,
      kind: 'some_kind',
      sn: data.imei,
      status: 'active',
    },
  };
  const createVehiclePayload = {
    optionalHeaders: headers,
    payload: {
      created: Date.now(),
      licensePlate: data.license,
      make: 'fill_me',
      model: 'fill_me',
      name: data.name,
      status: 'active',
      year: 'fill_me',
      odometer: {
        value: parseInt(data.odometer, 10),
      },
    },
  };

  const request = api.post(devicesUrl, createDevicePayload)
    .then(() => api.post(vehiceslUrl, createVehiclePayload))
    .then(res => res.json())
    .then(vehicle => {
      const attachDeviceUrl = `${vehiceslUrl}/${vehicle.id}/device`;

      return api.post(attachDeviceUrl, {
        payload: { deviceId: data.imei },
        optionalHeaders: headers,
      });
    });

  return request;
};
