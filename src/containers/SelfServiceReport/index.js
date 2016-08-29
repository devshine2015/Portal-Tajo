import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import drvrDevTheme from 'configs/theme';
import Report from 'containers/Report';
import { vehiclesActions } from 'services/FleetModel/actions';
import { authActions, fleetActions } from 'containers/App/actions';

const muiTheme = getMuiTheme(drvrDevTheme);

class SelfServiceReport extends React.Component {

  componentWillMount() {
    this.props.setFleet(this.props.fleet)
      .then(() => this.props.checkUserAuthentication({
        checkVersion: false,
      }))
      .then(() => this.props.fetchVehicles());
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Report />
      </MuiThemeProvider>
    );
  }
}

SelfServiceReport.propTypes = {
  checkUserAuthentication: React.PropTypes.func.isRequired,
  fetchVehicles: React.PropTypes.func.isRequired,
  setFleet: React.PropTypes.func.isRequired,
  fleet: React.PropTypes.string.isRequired,
};

const mapDispatch = {
  checkUserAuthentication: authActions.checkUserAuthentication,
  fetchVehicles: vehiclesActions.fetchVehicles,
  setFleet: fleetActions.setFleet,
};

const PureComponent = pure(SelfServiceReport);

export default connect(null, mapDispatch)(PureComponent);
