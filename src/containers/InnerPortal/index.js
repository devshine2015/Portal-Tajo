import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import SnackbarNotification from 'containers/Snackbar';
import styles from './styles.css';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';
import { getIsUserAuthenticated, getFleetName } from 'containers/App/reducer';
import { authActions } from 'containers/App/actions';
import PortalsList from 'components/PortalsLinks';
import { commonFleetActions } from 'services/FleetModel/actions';

const URLS = {
  success: 'dashboard',
  failure: 'login',
};

class InnerPortal extends React.Component {

  // TODO -- InnerPortal mounts each time screen change
  componentDidMount() {
    this.checkUserAuthentication();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fleet !== this.props.fleet) {
      this.checkUserAuthentication();
    }
  }

  checkUserAuthentication() {
    this.props.checkUserAuthentication({ urls: URLS }).then(() => {
      this.props.fetchFleet(this.props.hasRealTimeData);
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      const showPortals = this.props.showPortalsList === undefined ? true : this.props.showPortalsList;

      return (
        <div className={styles.appContent}>

          <div className={styles.topBarContainer}>
            <ApplicationBar title={this.props.fleet} />
            { showPortals && <PortalsList currentFleet={this.props.fleet} /> }
          </div>

          <MainSidebar />

          <div className={styles.content}>{this.props.children}</div>

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
  fleet: React.PropTypes.string.isRequired,
  hasRealTimeData: React.PropTypes.bool,
  isAuthenticated: React.PropTypes.bool.isRequired,
  showPortalsList: React.PropTypes.bool,
};

const PureInnerPortal = pure(InnerPortal);

const mapState = (state) => ({
  fleet: getFleetName(state),
  isAuthenticated: getIsUserAuthenticated(state),
});
const mapDispatch = {
  checkUserAuthentication: authActions.checkUserAuthentication,
  fetchFleet: commonFleetActions.fetchFleet,
};

export default connect(mapState, mapDispatch)(PureInnerPortal);
