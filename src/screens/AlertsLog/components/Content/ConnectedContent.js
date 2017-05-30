import { connect } from 'react-redux';
import { getPathToVehicles } from 'services/FleetModel/reducer';
import { getPathToGlobalContext } from 'services/Global/reducer';
import { logActions } from 'services/AlertsSystem/actions';
import {
  getLogsSlice,
  getConditionsSlice,
} from 'services/AlertsSystem/reducer';
import {
  makeGetLogEntries,
  makeGetIsConditionsReady,
} from 'services/AlertsSystem/selectors';
import Content from './Content';
import {
  makeGetSelectedVehicleId,
  makeGetSelectedVehicleName,
} from '../../selectors';

const makeMapStateToProps = () => {
  const getLogs = makeGetLogEntries();
  const getIsConditionsReady = makeGetIsConditionsReady();
  const getSelectedVehicleId = makeGetSelectedVehicleId();
  const getVehicleName = makeGetSelectedVehicleName();

  const mapStateToProps = (state) => {
    const selectedVehicleId = getSelectedVehicleId(getPathToGlobalContext(state));

    return {
      entries: getLogs(getLogsSlice(state)),
      isReady: getIsConditionsReady(getConditionsSlice(state)),
      selectedVehicleId,
      selectedVehicleName: getVehicleName(getPathToVehicles(state), selectedVehicleId),
    };
  };

  return mapStateToProps;
};

const mapDispatch = {
  fetchLogs: logActions.fetchLogs,
};

export default connect(makeMapStateToProps, mapDispatch)(Content);
