import api from 'utils/api';
import endpoints from 'configs/endpoints';
import { setLoaderState } from './loaderActions';
import { vehiclesActions } from 'services/FleetModel/actions';
import { mockBackendVehicle } from 'services/FleetModel/utils/vehicleHelpers';

export const INSTALLER_SUBMIT_SUCCESS = 'portal/Installer/INSTALLER_SUBMIT_SUCCESS';
export const INSTALLER_SUBMIT_FAILURE = 'portal/Installer/INSTALLER_SUBMIT_FAILURE';

export const submitForm = data => dispatch =>
  sendData(data, dispatch);

export const sendData = (formData, dispatch) => {
  dispatch(setLoaderState(true));
  const { method, url } = endpoints.createVehicle;
  const vehiclePayload = {
    payload: mockBackendVehicle(formData),
  };

  return api[method](url, vehiclePayload)
    .then(res => res.json())
    .then(vehicle => {
      dispatch(vehiclesActions.addVehicle(vehicle));

      return vehiclesActions.attachDevice(vehicle.id, formData.imei);
    })
    .then(() => {
      dispatch(setLoaderState(false));

      return Promise.resolve();
    }, error => {
      console.error(error);
      dispatch(setLoaderState(false));

      return Promise.reject();
    });
};
