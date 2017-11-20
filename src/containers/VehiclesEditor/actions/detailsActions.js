import R from 'ramda';
import { vehiclesActions } from 'services/FleetModel/actions';
import {
  detachDevice,
  attachDevice,
} from 'services/Devices/actions';
import {
  getVehicleByIdFunc,
  getVehiclesEx,
} from 'services/FleetModel/reducer';
import {
  preserveOriginalDetails,
  cleanVehicle,
  sortVehicles,
} from 'services/FleetModel/utils/vehicleHelpers';

export const VEHICLE_EDITOR_LOADER_SET = 'portal/VehiclesEditor/VEHICLE_EDITOR_LOADER_SET';
export const VEHICLE_EDITOR_LOADER_RESET = 'portal/VehiclesEditor/VEHICLE_EDITOR_LOADER_RESET';

export const updateDetails = ({
  data = {},
  selectedVehicleId,
  needResort,
  device,
}) => (dispatch, getState) => {
  dispatch({
    type: VEHICLE_EDITOR_LOADER_SET,
  });

  const selectedVehicle = getVehicleByIdFunc(getState())(selectedVehicleId);
  const updatedDetails = {
    ...selectedVehicle.original,
    ...data,
  };

  const details = cleanVehicle(preserveOriginalDetails(updatedDetails, selectedVehicle.original));

  let newIndex;
  let deviceId;

  return vehiclesActions.makeUpdateVehicleRequest(details, dispatch, getState)
    .then(() => {
      dispatch({
        type: VEHICLE_EDITOR_LOADER_RESET,
      });

      if (needResort) {
        const vehicles = getVehiclesEx(getState());
        const orderedList = sortVehicles(vehicles);

        newIndex = orderedList.indexOf(details.id);

        dispatch({
          type: vehiclesActions.FLEET_MODEL_ORDER_UPDATE,
          orderedList,
        });
      }

      // first - detach device if needed
      if (device.needDetach) {
        deviceId = selectedVehicle.original.deviceId;
        dispatch(detachDevice(selectedVehicle.id, deviceId));
      } else if (device.needAttach) {
        deviceId = data.deviceId;
        dispatch(attachDevice(selectedVehicle.id, deviceId));
      }

      return Promise.resolve();
    })
    .then(() => {
      // second - attach new device if needed
      if (device.needDetach && device.needAttach) {
        deviceId = data.deviceId;
        dispatch(attachDevice(selectedVehicle.id, deviceId));
      }

      return Promise.resolve();
    })
    .then(() => Promise.resolve(newIndex), (err) => {
      console.error(err);

      dispatch({
        type: VEHICLE_EDITOR_LOADER_RESET,
      });

      return Promise.reject();
    });
};

export const disableVehicleAndDevice = vehicle => dispatch =>
  dispatch(vehiclesActions.disableVehicle(vehicle.id))
    .then(() => {
      if (R.has('deviceId', vehicle.original)) {
        return dispatch(detachDevice(vehicle.id, vehicle.original.deviceId));
      }

      return Promise.resolve();
    }, console.error);
