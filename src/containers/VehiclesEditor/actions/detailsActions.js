import { vehiclesActions } from 'services/FleetModel/actions';
import {
  getVehicleByIdFunc,
  getVehiclesEx,
} from 'services/FleetModel/reducer';
import {
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

  const details = cleanVehicle(updatedDetails);

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

      // attach or detach device
      let deviceFunction = () => Promise.resolve();

      // first - detach device if needed
      if (device.needDetach) {
        deviceId = selectedVehicle.deviceId;
        deviceFunction = vehiclesActions.detachDevice;
      } else if (device.needAttach) {
        deviceId = data.deviceId;
        deviceFunction = vehiclesActions.attachDevice;
      }

      return deviceFunction(selectedVehicle.id, deviceId);
    })
    .then(() => {
      let deviceFunction = () => Promise.resolve();

      // second - attach new device if needed
      if (device.needDetach && device.needAttach) {
        deviceId = data.deviceId;
        deviceFunction = vehiclesActions.attachDevice;
      }

      return deviceFunction(selectedVehicle.id, deviceId);
    })
    .then(() => Promise.resolve(newIndex), () => {
      dispatch({
        type: VEHICLE_EDITOR_LOADER_RESET,
      });

      return Promise.reject();
    });
};
