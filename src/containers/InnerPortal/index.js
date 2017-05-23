import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import SnackbarNotification from 'containers/Snackbar';
import { getFleetName } from 'services/Session/reducer';
import { getVehiclesStaticSlice } from 'services/FleetModel/reducer';
import { makeGetFleetIsReady } from 'services/FleetModel/selectors';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';

import styles from './styles.css';

class InnerPortal extends React.Component {

  state = {
    isSidebarOpen: false,
  };

  toggleSidebar = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  canShowContent() {
    return this.context.authenticated() && this.props.fleetIsReady;
  }

  render() {
    // hide InnerPortal from unauthenticated users
    if (this.canShowContent()) {
      return (
        <div className={styles.innerPortal}>

          <ApplicationBar
            title={this.props.fleet}
            toggleSidebar={this.toggleSidebar}
          />

          <MainSidebar
            isOpened={this.state.isSidebarOpen}
            toggleSidebar={this.toggleSidebar}
          />

          <div className={styles.content}>
            {this.props.children}
          </div>

          {/* absolutely positioned stuff */}
          <SnackbarNotification />

        </div>
      );
    }

    return <div>Loading...</div>;
  }
}

InnerPortal.contextTypes = {
  authenticated: React.PropTypes.func.isRequired,
};

InnerPortal.propTypes = {
  children: React.PropTypes.node.isRequired,
  fleet: React.PropTypes.string,
  fleetIsReady: React.PropTypes.bool.isRequired,
};

InnerPortal.defaultProps = {
  fleet: '',
};

const PureInnerPortal = pure(InnerPortal);

const makeMapStateToProps = () => {
  const getIsReady = makeGetFleetIsReady();

  const mapState = (state) => {
    return {
      fleet: getFleetName(state),
      fleetIsReady: getIsReady(getVehiclesStaticSlice(state)),
    };
  };

  return mapState;
};

export default connect(makeMapStateToProps)(PureInnerPortal);
