import * as devicesActions from 'services/Devices/actions';
import { getProcessedVehicles } from 'services/FleetModel/reducer';

export const DEVICES_MANAGER_SETUP_SUCCESS = 'portal/DevicesManager/DEVICES_MANAGER_SETUP_SUCCESS';

export const fetchDevices = () => (dispatch, getState) => (
  dispatch(devicesActions.fetchDevices())
    .then(devices => {
      const vehicles = getProcessedVehicles(getState());
      const notAttached = [];
      const faultVehicles = [];
      const associatedVehicles = {};

      devices.forEach(({ vehicleId, id }) => {
        const correctVehicle = vehicles.get(vehicleId);

        if (!!vehicleId && correctVehicle) {
          associatedVehicles[id] = vehicles.getIn([vehicleId, 'name']);
        } else if (!vehicleId) {
          notAttached.push(id);
        } else if (!correctVehicle) {
          faultVehicles.push(id);
        }
      });

      dispatch(_setupDevicesAfterFetch({ notAttached, faultVehicles, associatedVehicles }));
    })
);

const _setupDevicesAfterFetch = ({
  notAttached,
  faultVehicles,
  associatedVehicles,
}) => ({
  type: DEVICES_MANAGER_SETUP_SUCCESS,
  notAttached,
  faultVehicles,
  associatedVehicles,
});
