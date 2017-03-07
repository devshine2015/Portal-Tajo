import api from 'utils/api';
import endpoints from 'configs/endpoints';
import { setLoaderState } from './loaderActions';
import { vehiclesActions } from 'services/FleetModel/actions';
import { attachDevice } from 'services/Devices/actions';
import { mockRequiredBackendProps } from 'services/FleetModel/utils/vehicleHelpers';

export const INSTALLER_SUBMIT_SUCCESS = 'portal/Installer/INSTALLER_SUBMIT_SUCCESS';
export const INSTALLER_SUBMIT_FAILURE = 'portal/Installer/INSTALLER_SUBMIT_FAILURE';

export const submitForm = data => dispatch =>
  sendData(data, dispatch);

export const sendData = (formData, dispatch) => {
  dispatch(setLoaderState(true));
  const { method, url } = endpoints.createVehicle;
  const vehiclePayload = {
    payload: mockRequiredBackendProps(formData),
  };

  return api[method](url, vehiclePayload)
    .then(res => res.json())
    .then(vehicle => {
      dispatch(vehiclesActions.addVehicle(vehicle));
      dispatch(attachDevice(vehicle.id, formData.imei));

      return vehicle.id;
    })
    .then(vehicleId => {
      dispatch(setLoaderState(false));
      dispatch({
        type: vehiclesActions.FLEET_MODEL_ATTACH_DEVICE,
        id: vehicleId,
        deviceId: formData.imei,
      });

      return Promise.resolve();
    }, error => {
      console.error(error);
      dispatch(setLoaderState(false));

      return Promise.reject();
    });
};
