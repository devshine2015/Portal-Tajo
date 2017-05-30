import { createSelector } from 'reselect';
import {
  getVehiclesExSorted,
  getVehicleById,
} from 'services/FleetModel/reducers/vehiclesReducer';
import {
  getVehicleFilterString,
  getSelectedVehicleId,
} from 'services/Global/reducers/contextReducer';
import { selectLogEntries } from 'services/AlertsSystem/selectors';

const logEntries = logsState => selectLogEntries(logsState);
const selectVehicleId = (_, contextState) => getSelectedVehicleId(contextState);

export const makeGetSelectedVehicleId = () => {
  return createSelector(getSelectedVehicleId, (selectedId) => {
    return selectedId;
  });
};

export const makeGetLogEntries = () => {
  return createSelector([logEntries, selectVehicleId], (entries, selectedVehicleId) => {
    return {
      entries: selectedVehicleId !== '' ? entries.filter(entry => entry.get('ownerId') === selectedVehicleId) : entries,
      selectedVehicleId,
    };
  });
};

export const makeGetVehicles = () => {
  return createSelector(getVehiclesExSorted, (vehicles) => {
    return vehicles;
  });
};

export const makeGetFilterString = () => {
  return createSelector(getVehicleFilterString, (filterString) => {
    return filterString;
  });
};

export const makeGetSelectedVehicleName = () => {
  return createSelector(getVehicleById, (imVehicle) => {
    return imVehicle ? imVehicle.getIn(['original', 'name']) : undefined;
  });
};
