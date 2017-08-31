import React from 'react';
import PropTypes from 'prop-types';
import AnimatedLogo from 'components/animated';
import SnackbarNotification from 'containers/Snackbar';
import ApplicationBar from './components/ApplicationBar';
import MainSidebar from './components/MainSidebar';
import styles from './styles.css';

class InnerPortal extends React.Component {

  state = {
    isSidebarOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.fleetIsReady && nextProps.fleetIsReady) {
      this.props.fetchPortalData();
    }
  }

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

    return <AnimatedLogo.FullscreenLogo />;
  }
}

InnerPortal.contextTypes = {
  authenticated: PropTypes.func.isRequired,
};

InnerPortal.propTypes = {
  children: PropTypes.node.isRequired,
  fleet: PropTypes.string,
  fleetIsReady: PropTypes.bool.isRequired,
  fetchPortalData: PropTypes.func.isRequired,
};

InnerPortal.defaultProps = {
  fleet: '',
};

export default InnerPortal;
