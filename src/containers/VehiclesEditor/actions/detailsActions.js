import { vehiclesActions } from 'services/FleetModel/actions';
import { cleanVehicle } from 'services/FleetModel/utils/vehicleHelpers';
import { getVehicleByIdFunc } from 'services/FleetModel/reducer';

export const VEHICLE_EDITOR_LOADER_SET = 'portal/VehiclesEditor/VEHICLE_EDITOR_LOADER_SET';
export const VEHICLE_EDITOR_LOADER_RESET = 'portal/VehiclesEditor/VEHICLE_EDITOR_LOADER_RESET';

export const updateDetails = (data = {}, selectedVehicleId) => (dispatch, getState) => {
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

      return Promise.resolve();
    }, () => {
      dispatch({
        type: VEHICLE_EDITOR_LOADER_RESET,
      });

      return Promise.reject();
    });
};
