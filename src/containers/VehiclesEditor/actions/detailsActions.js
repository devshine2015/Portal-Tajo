import { vehiclesActions } from 'services/FleetModel/actions';

export const VEHICLE_EDITOR_LOADER_SET = 'portal/VehiclesEditor/VEHICLE_EDITOR_LOADER_SET';
export const VEHICLE_EDITOR_LOADER_RESET = 'portal/VehiclesEditor/VEHICLE_EDITOR_LOADER_RESET';

export const updateDetails = (details = {}, index) => (dispatch, getState) => {
  dispatch({
    type: VEHICLE_EDITOR_LOADER_SET,
  });

  return vehiclesActions.makeUpdateVehicleRequest(details, index, dispatch, getState)
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
