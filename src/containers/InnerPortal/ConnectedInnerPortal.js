import { connect } from 'react-redux';
import { getFleetName } from 'services/Session/reducer';
import makeGetMainAccessToken from 'services/Session/selectors';
import { getVehiclesStaticSlice } from 'services/FleetModel/reducer';
import { makeGetFleetIsReady } from 'services/FleetModel/selectors';
import { fetchDevices } from 'services/Devices/actions';
import {
  conditionsActions,
  journalActions,
} from 'services/AlertsSystem/actions';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import InnerPortal from './InnerPortal';

const makeMapStateToProps = () => {
  const getIsReady = makeGetFleetIsReady();
  const getMainAccessToken = makeGetMainAccessToken();

  const mapState = (state) => {
    return {
      fleet: getFleetName(state),
      fleetIsReady: getIsReady(getVehiclesStaticSlice(state)),
      accessToken: getMainAccessToken(state),
    };
  };

  return mapState;
};

const mapDispatch = (dispatch) => {
  return {
    fetchPortalData: () => {
      dispatch(conditionsActions.fetchAlertConditions())
        .then(() => dispatch(journalActions.fetchNotifications(makePeriodForLast24Hours())))
        .then(() => dispatch(fetchDevices()));
    },
  };
};

export default connect(makeMapStateToProps, mapDispatch)(InnerPortal);
