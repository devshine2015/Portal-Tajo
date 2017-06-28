import { connect } from 'react-redux';
import { onlineActions } from 'services/Global/actions';
import {
  setSession,
  cleanSession,
  fetchAccessTokens,
} from 'services/Session/actions';
import { fetchRolesAndPermissions } from 'services/Users/actions';
import { getLocale } from 'services/Session/reducer';
import { commonFleetActions } from 'services/FleetModel/actions';
import { setReportsMWA } from 'containers/Report/actions/reportActions';
import App from './App';

const mapState = state => ({
  locale: getLocale(state),
});
const mapDispatch = {
  changeOnlineState: onlineActions.changeOnlineState,
  saveSession: setSession,
  cleanSession,
  fetchAccessTokens,
  fetchRolesAndPermissions,
  fetchFleet: commonFleetActions.fetchFleet,
  setReportsMWA,
};

export default connect(mapState, mapDispatch)(App);
