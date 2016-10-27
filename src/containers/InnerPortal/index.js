import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import SnackbarNotification from 'containers/Snackbar';
import styles from './styles.css';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';
import { getFleetName } from 'services/UserModel/reducer';
import { getIsUserAuthenticated } from 'services/Auth/reducer';
import { localActions } from 'services/Auth/actions';
import { commonFleetActions } from 'services/FleetModel/actions';
import { fetchDevices } from 'services/Devices/actions';

const URLS = {
  failure: 'login',
};

class InnerPortal extends React.Component {

  componentDidMount() {
    this.checkUserAuthentication();
  }

  checkUserAuthentication() {
    this.props.checkUserAuthentication({ urls: URLS }).then(isAuthenticated => {
      if (isAuthenticated) {
        this.props.fetchFleet()
        .then(() => this.props.fetchDevices());
      }
    });
  }

  render() {
    // check here to hide InnerPortal
    // from unauthenticated users for sure
    if (this.props.isAuthenticated) {
      return (
        <div className={styles.innerPortal}>

          <ApplicationBar title={this.props.fleet} />

          <MainSidebar />

          <div className={styles.content}>
            {this.props.children}
          </div>

          <SnackbarNotification />

        </div>
      );
    }

    return null;
  }
}

InnerPortal.propTypes = {
  checkUserAuthentication: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  fetchFleet: React.PropTypes.func.isRequired,
  fetchDevices: React.PropTypes.func.isRequired,
  fleet: React.PropTypes.string,
  isAuthenticated: React.PropTypes.bool.isRequired,
  showPortalsList: React.PropTypes.bool,
};

const PureInnerPortal = pure(InnerPortal);

const mapState = (state) => ({
  fleet: getFleetName(state),
  isAuthenticated: getIsUserAuthenticated(state),
});
const mapDispatch = {
  fetchDevices,
  checkUserAuthentication: localActions.checkUserAuthentication,
  fetchFleet: commonFleetActions.fetchFleet,
};

export default connect(mapState, mapDispatch)(PureInnerPortal);
