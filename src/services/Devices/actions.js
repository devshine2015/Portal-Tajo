import api from 'utils/api';
import endpoints from 'configs/endpoints';
import { getProcessedVehicles } from 'services/FleetModel/reducer';
import { getDevices } from './reducer';

export const DEVICES_FETCH_SUCCESS = 'portal/Devices/DEVICES_FETCH_SUCCESS';
export const DEVICES_UPDATE = 'portal/Devices/DEVICES_UPDATE';

export const fetchDevices = () => dispatch => {
  const { url, method, apiVersion } = endpoints.getDevices;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(devices => {
      const devicesMap = {};

      devices.forEach(device => {
        devicesMap[device.id] = {
          id: device.id,
          original: device,
          notAttached: !device.vehicleId,
          vehicleName: '',
          vehicleIsFault: false,
        };
      });

      dispatch(_devicesFetchSuccess(devicesMap));

      return devices;
    });
};

export const updateWithVehicles = () => (dispatch, getState) => {
  const vehicles = getProcessedVehicles(getState());
  const devices = getDevices(getState());
  const devicesWithVehicles = {};

  devices.forEach(device => {
    const v = vehicles.get(device.original.vehicleId);

    devicesWithVehicles[device.id] = {
      ...device,
      vehicleIsFault: !device.notAttached && !v,
      vehicleName: !!v ? v.get('name') : '',
    };
  });

  dispatch(_updateWithVehciles(devicesWithVehicles));

  return Promise.resolve();
};

const _devicesFetchSuccess = devices => ({
  type: DEVICES_FETCH_SUCCESS,
  devices,
});

const _updateWithVehciles = devices => ({
  type: DEVICES_UPDATE,
  devices,
});
