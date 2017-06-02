import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeLocalDrivers,
} from '../utils/driverHelpers';

export const FLEET_MODEL_DRIVERS_SET = 'srv/drv_set';

export const fetchDrivers = () => (dispatch) => {
  const { url, method } = endpoints.getDrivers;

  return api[method](url)
    .then(response => response.json())
    .then((drivers) => {
      const localDrivers = makeLocalDrivers(drivers);
      dispatch(_driversSet(localDrivers));
    })
    .catch((e) => {
      console.error(e);
    });
};

const _driversSet = drivers => ({
  type: FLEET_MODEL_DRIVERS_SET,
  drivers,
});
