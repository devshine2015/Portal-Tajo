import { connect } from 'react-redux';
import { api } from 'utils/api';
import { getFleetName } from 'services/Session/reducer';
import { getVehiclesStaticSlice } from 'services/FleetModel/reducer';
import makeGetFleetIsReady from 'services/FleetModel/selectors';
import { fetchDevices } from 'services/Devices/actions';
import { commonFleetActions, socketActions } from 'services/FleetModel/actions';
import {
  conditionsActions,
  journalActions,
} from 'services/AlertsSystem/actions';
import {
  checkSetMaritime,
  checkSetNoIcons,
  checkSetFullScreen,
} from 'configs';

import { updateFleetName } from 'services/Session/actions';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import CustomerPortal from './CustomerPortal';

const makeMapStateToProps = () => {
  const getIsReady = makeGetFleetIsReady();

  const mapState = state => ({
    fleet: getFleetName(state),
    readyToShowPortal: getIsReady(getVehiclesStaticSlice(state)),
  });

  return mapState;
};

function updateFleet(nextFleetName) {
  return (dispatch, getState) => {
    api.setFleet(nextFleetName);
    dispatch(socketActions.reopenFleetSocket());

    checkSetMaritime(nextFleetName);
    checkSetNoIcons(nextFleetName);
    checkSetFullScreen(nextFleetName);

    dispatch(updateFleetName(nextFleetName))
      .then(() => dispatch(commonFleetActions.fetchFleet()))
      .then(() => dispatch(conditionsActions.fetchAllVehicleAlerts(getState)))
      .then(() => dispatch(conditionsActions.validateAllVehiclesAlertStatus(getState)));
  };
}

const mapDispatch = dispatch => ({
  fetchSpecificData: () => {
    dispatch(conditionsActions.fetchAlertConditions())
      .then(() => dispatch(journalActions.fetchNotifications(makePeriodForLast24Hours())))
      .then(() => dispatch(fetchDevices()));
  },
  changeFleet: (nextFleetName) => {
    dispatch(updateFleet(nextFleetName));
    // api.setFleet(nextFleetName);
    // dispatch(socketActions.reopenFleetSocket());

    // dispatch(updateFleetName(nextFleetName))
    //   .then(() => dispatch(commonFleetActions.fetchFleet()));
    // // .then(() => dispatch(conditionsActions.fetchAllVehicleAlerts(getStore)));
  },
});

export default connect(makeMapStateToProps, mapDispatch)(CustomerPortal);
