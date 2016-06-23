import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import createBaseUrl from 'utils/createBaseUrl';
import { AppBar, FlatButton } from 'material-ui';
import SnackbarNotification from 'containers/Snackbar';
import { authActions } from 'containers/App/actions';
import { getFleetName } from 'containers/App/reducer';
import styles from './styles.css';
import { getDashboardPages } from './reducer';
import MainSidebar from 'containers/MainSidebar';
import { sidebarActions } from './actions';

class Dashboard extends React.Component {

  onLogoutClick = () => {
    this.props.logout(this.props.fleet);
  }

  render() {
    const baseUrl = `${createBaseUrl(this.props.fleet)}/dashboard`;

    return (
      <div className={styles.appContent}>
        <AppBar
          title="Dashboard"
          iconElementRight={
            <FlatButton
              label="Logout"
              onClick={this.onLogoutClick}
            />
          }
          style={{
            zIndex: 1500,
          }}
          zDepth={0}
          onLeftIconButtonTouchTap={this.props.toggleSidebar}
        />

        <MainSidebar baseUrl={baseUrl} />

        <div className={styles.content}>{this.props.children}</div>
        <SnackbarNotification />
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func.isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,
};

const PureDashboard = pure(Dashboard);

const mapState = (state) => ({
  pages: getDashboardPages(state).toArray(),
  fleet: getFleetName(state),
});
const mapDispatch = {
  toggleSidebar: sidebarActions.sidebarStateChange,
  logout: authActions.logout,
};

export default connect(mapState, mapDispatch)(PureDashboard);
