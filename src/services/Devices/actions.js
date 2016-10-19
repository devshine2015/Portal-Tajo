import api from 'utils/api';
import endpoints from 'configs/endpoints';
import { getProcessedVehicles } from 'services/FleetModel/reducer';
import {
  getDevices,
  getFaultAmount,
  getNotAttachedAmount,
} from './reducer';

export const DEVICES_DEVICE_DEACTIVATE = 'portal/Devices/DEVICES_DEVICE_DEACTIVATE';
export const DEVICES_FETCH_SUCCESS = 'portal/Devices/DEVICES_FETCH_SUCCESS';
export const DEVICES_DEVICE_ADD = 'portal/Devices/DEVICES_DEVICE_ADD';
export const DEVICES_UPDATE = 'portal/Devices/DEVICES_UPDATE';

export const fetchDevices = () => dispatch => {
  const { url, method, apiVersion } = endpoints.getDevices;

  return api[method](url, { apiVersion })
    .then(res => res.json())
    .then(devices => {
      const devicesMap = {};
      let notAttachedAmount = 0;

      devices.forEach(device => {
        const notAttached = !device.vehicleId;

        if (notAttached) {
          notAttachedAmount++;
        }

        devicesMap[device.id] = {
          notAttached,
          id: device.id,
          original: device,
          vehicleName: '',
          vehicleIsFault: false,
        };
      });

      dispatch(_devicesFetchSuccess(devicesMap, notAttachedAmount));

      return devices;
    });
};

export const updateWithVehicles = () => (dispatch, getState) => {
  const vehicles = getProcessedVehicles(getState());
  const devices = getDevices(getState());
  const devicesWithVehicles = {};
  let faultAmount = 0;

  devices.forEach(device => {
    const v = vehicles.get(device.original.vehicleId);
    const vehicleIsFault = !device.notAttached && !v;

    if (vehicleIsFault) {
      faultAmount++;
    }

    devicesWithVehicles[device.id] = {
      ...device,
      vehicleIsFault,
      vehicleName: !!v ? v.get('name') : '',
    };
  });

  dispatch(_updateWithVehciles(devicesWithVehicles, faultAmount));

  return Promise.resolve();
};

export const createDevice = ({ imei, model }) => (dispatch, getState) => {
  const { url, method, apiVersion } = endpoints.createDevice;
  const payload = {
    payload: {
      id: imei,
      kind: model,
      sn: imei,
      status: 'active',
    },
    apiVersion,
  };

  return api[method](url, payload)
    .then(() => {
      const notAttachedAmount = getNotAttachedAmount(getState()) + 1;
      const newDevice = {
        id: imei,
        original: payload.payload,
        notAttached: true,
        vehicleName: '',
        vehicleIsFault: false,
      };

      dispatch(_addNewDevice(newDevice, notAttachedAmount));

      return Promise.resolve();
    });
};

export const deactivateDevice = device => (dispatch, getState) => {
  const { url, method, apiVersion } = endpoints.deactivate(device.id);

  return api[method](url, { apiVersion })
    .then((res) => {
      console.log(res)
      let notAttachedAmount = getNotAttachedAmount(getState());
      let faultAmount = getFaultAmount(getState());

      if (device.notAttached) {
        notAttachedAmount--;
      }
      if (device.vehicleIsFault) {
        faultAmount--;
      }

      dispatch(_deactivateDevice({
        id: device.id,
        faultAmount,
        notAttachedAmount,
      }));

      return Promise.resolve();
    });
};

const _devicesFetchSuccess = (devices, notAttachedAmount) => ({
  type: DEVICES_FETCH_SUCCESS,
  devices,
  notAttachedAmount,
});

const _updateWithVehciles = (devices, faultAmount) => ({
  type: DEVICES_UPDATE,
  devices,
  faultAmount,
});

const _addNewDevice = (data, notAttachedAmount) => ({
  type: DEVICES_DEVICE_ADD,
  data,
  notAttachedAmount,
});

const _deactivateDevice = ({
  id,
  faultAmount,
  notAttachedAmount,
}) => ({
  type: DEVICES_DEVICE_DEACTIVATE,
  id,
  faultAmount,
  notAttachedAmount,
});
