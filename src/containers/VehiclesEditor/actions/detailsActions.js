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

export const updateDetails = (data = {}, selectedVehicleId, needResort) => (dispatch, getState) => {
  dispatch({
    type: VEHICLE_EDITOR_LOADER_SET,
  });

  const selectedVehicle = getVehicleByIdFunc(getState())(selectedVehicleId);
  const updatedDetails = {
    ...selectedVehicle,
    ...data,
  };
  const details = cleanVehicle(updatedDetails);

  return vehiclesActions.makeUpdateVehicleRequest(details, dispatch, getState)
    .then(() => {
      dispatch({
        type: VEHICLE_EDITOR_LOADER_RESET,
      });

      let newIndex;

      if (needResort) {
        const vehicles = getVehiclesEx(getState());
        const orderedList = sortVehicles(vehicles);

        newIndex = orderedList.indexOf(details.id);

        dispatch({
          type: vehiclesActions.FLEET_MODEL_ORDER_UPDATE,
          orderedList,
        });
      }

      return Promise.resolve(newIndex);
    }, () => {
      dispatch({
        type: VEHICLE_EDITOR_LOADER_RESET,
      });

      return Promise.reject();
    });
};
