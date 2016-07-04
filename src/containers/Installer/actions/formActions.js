import api from 'utils/api';
import { setLoaderState } from './loaderActions';

export const submitForm = (fleet, data) => (dispatch) =>
  _submitForm(fleet, data, dispatch);

function _submitForm(fleet, data, dispatch) {
  dispatch(setLoaderState(true));

  return sendData(fleet, data).then(() => {
    dispatch(setLoaderState(false));
    return Promise.resolve();
  }, () => {
    dispatch(setLoaderState(false));
    return Promise.reject();
  });
}

export const sendData = (fleet, data) => {
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
    .then(api.post(vehiceslUrl, createVehiclePayload))
    .then(response => response.json())
    .then(vehicle => {
      const attachDeviceUrl = `${vehiceslUrl}/${vehicle.id}/device`;

      return api.post(attachDeviceUrl, {
        payload: { deviceId: data.imei },
      });
    });

  return request;
};
