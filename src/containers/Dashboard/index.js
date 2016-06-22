import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import createBaseUrl from 'utils/createBaseUrl';
import { AppBar, FlatButton } from 'material-ui';
import SnackbarNotification from 'containers/Snackbar';
import { authActions } from 'containers/App/actions';
import { getFleetName } from 'containers/App/reducer';

class Dashboard extends React.Component {

  onLogoutClick = () => {
    this.props.logout(this.props.fleet);
  }

  render() {
    const baseUrl = `${createBaseUrl(this.props.fleet)}/dashboard`;

    return (
      <div>
        <AppBar
          title="Dashboard"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton
              label="Logout"
              onClick={this.onLogoutClick}
            />
          }
        />
        <Link to={`${baseUrl}/reports`}>Reports</Link> <wbr />
        <Link to={`${baseUrl}/installer`}>Installer</Link> <wbr />
        <Link to={`${baseUrl}/promos`}>Promos</Link> <wbr />

        <div className="content">{this.props.children}</div>
        <SnackbarNotification />
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func.isRequired,
};

const PureDashboard = pure(Dashboard);

const mapState = (state) => ({
  fleet: getFleetName(state),
});
const mapDispatch = {
  logout: authActions.logout,
};

export default connect(mapState, mapDispatch)(PureDashboard);
