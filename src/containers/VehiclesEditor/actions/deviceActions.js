import api from 'utils/api';
import endpoints from 'configs/endpoints';
import { vehiclesActions } from 'services/FleetModel/actions';

export const detachDevice = vehicleId => dispatch => {
  const { url, method, apiVersion } = endpoints.detachDevice(vehicleId);

  return api[method](url, { apiVersion })
    .then(() => {
      dispatch({
        type: vehiclesActions.FLEET_MODEL_DETACH_DEVICE,
        id: vehicleId,
      });
    }, () => {});
};

export const attachDevice = (vehicleId, deviceId) => dispatch => {
  const { url, method, apiVersion } = endpoints.attachDevice(vehicleId);
  const payload = {
    payload: {
      deviceId,
    },
    apiVersion,
  };

  return api[method](url, payload)
    .then(() => {
      dispatch({
        type: vehiclesActions.FLEET_MODEL_ATTACH_DEVICE,
        id: vehicleId,
        deviceId,
      });
    }, () => {});
};
