import { isDealer } from 'configs';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import { vehiclesActions } from 'services/FleetModel/actions';
import { attachDevice } from 'services/Devices/actions';
import dealerSelectors from 'services/Dealer/selectors';
import { mockRequiredBackendProps } from 'services/FleetModel/utils/vehicleHelpers';
import { setLoaderState } from './loaderActions';

export const INSTALLER_SUBMIT_SUCCESS = 'portal/Installer/INSTALLER_SUBMIT_SUCCESS';
export const INSTALLER_SUBMIT_FAILURE = 'portal/Installer/INSTALLER_SUBMIT_FAILURE';

export const submitForm = data => (dispatch, getState) =>
  sendData(data, dispatch, getState);

export const sendData = (formData, dispatch, getState) => {
  dispatch(setLoaderState(true));

  const subFleet = isDealer ? dealerSelectors.getSelectedSubFleet(getState()) : '';

  const { method, url } = endpoints.createVehicle;
  const vehiclePayload = {
    payload: mockRequiredBackendProps(formData, subFleet),
  };

  return api[method](url, vehiclePayload)
    .then(res => res.json())
    .then((vehicle) => {
      dispatch(vehiclesActions.addVehicle(vehicle));
      dispatch(attachDevice(vehicle.id, formData.imei));

      return vehicle.id;
    })
    .then((vehicleId) => {
      dispatch(setLoaderState(false));
      dispatch({
        type: vehiclesActions.FLEET_MODEL_ATTACH_DEVICE,
        id: vehicleId,
        deviceId: formData.imei,
      });

      return Promise.resolve();
    }, (error) => {
      console.error(error);
      dispatch(setLoaderState(false));

      return Promise.reject();
    });
};
