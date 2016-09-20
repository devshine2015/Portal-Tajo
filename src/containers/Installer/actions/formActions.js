import api from 'utils/api.next';
import endpoints from 'configs/endpoints';
import { setLoaderState } from './loaderActions';

export const submitForm = data => dispatch =>
  _submitForm(data, dispatch);

function _submitForm(data, dispatch) {
  dispatch(setLoaderState(true));

  return sendData(data).then(() => {
    dispatch(setLoaderState(false));
    return Promise.resolve();
  }, (error) => {
    console.error(error);
    dispatch(setLoaderState(false));
    return Promise.reject();
  });
}

export const sendData = data => {
  const { createVehicle, createDevice } = endpoints;
  const createDevicePayload = {
    payload: {
      id: data.imei,
      kind: 'some_kind',
      sn: data.imei,
      status: 'active',
    },
  };

  // convert miles to kilometres
  const odo = data.isMiles ? data.odometer * 1.60934 : data.odometer;

  const createVehiclePayload = {
    payload: {
      created: Date.now(),
      licensePlate: data.license,
      make: '',
      model: '',
      name: data.name,
      status: 'active',
      year: '',
      odometer: {
        // backend can accept only integers here, i.e. km.
        value: parseInt(odo, 10),
      },
    },
  };

  const request = api[createDevice.method](createDevice.url, createDevicePayload)
    .then(() => api[createVehicle.method](createVehicle.url, createVehiclePayload))
    .then(res => res.json())
    .then(vehicle => {
      const { url, method } = endpoints.attachDevice(vehicle.id);

      return api[method](url, {
        payload: { deviceId: data.imei },
      });
    });

  return request;
};
