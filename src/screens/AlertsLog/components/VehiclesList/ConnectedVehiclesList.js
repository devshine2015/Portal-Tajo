import { connect } from 'react-redux';
import { getPathToVehicles } from 'services/FleetModel/reducer';
import { contextActions } from 'services/Global/actions';
import { getPathToGlobalContext } from 'services/Global/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import AlertsVehiclesList from './VehiclesList';
import {
  makeGetVehicles,
  makeGetFilterString,
  makeGetSelectedVehicleId,
} from '../../selectors';

const makeMapStateToProps = () => {
  const getVehicles = makeGetVehicles();
  const getFilterString = makeGetFilterString();
  const getSelectedVehicleId = makeGetSelectedVehicleId();

  const mapState = (state) => {
    const globalContextState = getPathToGlobalContext(state);

    const vehicles = getVehicles(getPathToVehicles(state));
    const filterString = getFilterString(globalContextState);
    const selectedVehicleId = getSelectedVehicleId(globalContextState);

    return {
      vehicles,
      filterString,
      selectedVehicleId,
    };
  };

  return mapState;
};

const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  selectVehicle: contextActions.ctxSelectVehicle,
};

export default connect(makeMapStateToProps, mapDispatch)(AlertsVehiclesList);
