import { connect } from 'react-redux';
import { getPathToGlobalContext } from 'services/Global/reducer';
import { getPathToVehicles } from 'services/FleetModel/reducer';
import { logActions } from 'services/AlertsSystem/actions';
import { getConditionsSlice, getLogsSlice } from 'services/AlertsSystem/reducer';
import { makeGetIsConditionsReady } from 'services/AlertsSystem/selectors';
import Content from './Content';
import {
  makeGetLogEntries,
  makeGetSelectedVehicleName,
} from '../../selectors';

const makeMapStateToProps = () => {
  const getLogs = makeGetLogEntries();
  const getIsConditionsReady = makeGetIsConditionsReady();
  const getVehicleName = makeGetSelectedVehicleName();

  const mapStateToProps = (state) => {
    const { selectedVehicleId, entries } = getLogs(getLogsSlice(state), getPathToGlobalContext(state));

    return {
      entries,
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
