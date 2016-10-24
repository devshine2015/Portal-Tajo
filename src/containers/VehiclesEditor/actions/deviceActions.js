import { vehiclesActions } from 'services/FleetModel/actions';

export const detachDeviceLocally = vehicleId => ({
  type: vehiclesActions.FLEET_MODEL_DETACH_DEVICE,
  id: vehicleId,
});
  // const { url, method, apiVersion } = endpoints.detachDevice(vehicleId);

  // return api[method](url, { apiVersion })
  //   .then(() => {

export const attachDeviceLocally = (vehicleId, deviceId) => ({
  type: vehiclesActions.FLEET_MODEL_ATTACH_DEVICE,
  id: vehicleId,
  deviceId,
});
  // const { url, method, apiVersion } = endpoints.attachDevice(vehicleId);
  // const payload = {
  //   payload: {
  //     deviceId,
  //   },
  //   apiVersion,
  // };
