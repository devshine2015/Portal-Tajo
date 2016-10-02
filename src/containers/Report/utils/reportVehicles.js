import { getVehiclesEx } from 'services/FleetModel/reducer';
import {
  getIsFiltering,
  getSelectedVehicles,
} from '../reducer';

function _getVehiclesForReport(state) {
  const selectedVehicles = getSelectedVehicles(state).toArray();
  const vehicles = getVehiclesEx(state);
  const isFiltering = getIsFiltering(state);

  const takeSelected = () => vehicles.filter(v => selectedVehicles.indexOf(v.id) !== -1);
  const takeFiltered = () => vehicles.filter(v => !v.filteredOut);
  const takeFilteredAndSelected = () => vehicles.filter(v => (
    selectedVehicles.indexOf(v.id) !== -1 && !v.filteredOut
  ));

  let vehiclesToReport = [];

  // take only selected from filtered vehicles
  if (isFiltering && selectedVehicles.length) {
    vehiclesToReport = takeFilteredAndSelected();
  } else if (!isFiltering && selectedVehicles.length) {
  // take only selected vehicles
    vehiclesToReport = takeSelected();
  }

  // take filtered
  if (vehiclesToReport.length === 0) {
    vehiclesToReport = takeFiltered();
  }

  return vehiclesToReport;
}

export default _getVehiclesForReport;
