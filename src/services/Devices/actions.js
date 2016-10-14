import api from 'utils/api';
import endpoints from 'configs/endpoints';

export const DEVICES_FETCH_SUCCESS = 'portal/Devices/DEVICES_FETCH_SUCCESS';

export const fetchDevices = () => dispatch => {
  const { url, method, apiVersion } = endpoints.getDevices;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(devices => {
      const devicesMap = {};

      devices.forEach(device => {
        devicesMap[device.id] = device;
      });

      dispatch(_devicesFetchSuccess(devicesMap));

      return devices;
    });
};

const _devicesFetchSuccess = devices => ({
  type: DEVICES_FETCH_SUCCESS,
  devices,
});
