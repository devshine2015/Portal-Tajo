import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from './components/OldPortalAppBar';
import drvrDevTheme from 'configs/theme';
import Report from 'containers/Report';
import { vehiclesActions } from 'services/FleetModel/actions';
import { authActions, fleetActions } from 'containers/App/actions';
import {
  storage,
  constants,
} from 'utils';

import styles from './styles.css';

const muiTheme = getMuiTheme(drvrDevTheme);

const HOME_URL = 'index.html';

class SelfServiceReport extends React.Component {

  componentWillMount() {
    this.props.setFleet(this.props.fleet)
      .then(() => this.props.checkUserAuthentication({
        checkVersion: false,
      }))
      .then(() => this.props.fetchVehicles());
  }

  logout = () => {
    this.props.logout(HOME_URL)
      .then(() => storage.clean(constants.LOCAL_STORAGE_SESSION_KEY))
      .then(() => window.location.replace(HOME_URL));
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            logout={this.logout}
            fleet={this.props.fleet}
            goHome={this.props.goHome}
          />
          <Report
            vehiclesClassName={styles.vehiclesColumn}
            contentClassName={styles.content}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

SelfServiceReport.propTypes = {
  checkUserAuthentication: React.PropTypes.func.isRequired,
  fetchVehicles: React.PropTypes.func.isRequired,
  setFleet: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  fleet: React.PropTypes.string.isRequired,
  goHome: React.PropTypes.func.isRequired,
};

const mapDispatch = {
  checkUserAuthentication: authActions.checkUserAuthentication,
  fetchVehicles: vehiclesActions.fetchVehicles,
  setFleet: fleetActions.setFleet,
  logout: authActions.logout,
  goHome: () => window.location.replace(HOME_URL),
};

const PureComponent = pure(SelfServiceReport);

export default connect(null, mapDispatch)(PureComponent);
