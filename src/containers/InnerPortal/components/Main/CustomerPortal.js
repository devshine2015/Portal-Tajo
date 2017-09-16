import React from 'react';
import PropTypes from 'prop-types';
import AnimatedLogo from 'components/animated';
import SnackbarNotification from 'containers/Snackbar';
import ApplicationBar from '../ApplicationBar';
import MainSidebar from '../MainSidebar';
import Main from './Main';
import styles from './styles.css';

class CustomerPortal extends Main {
  render() {
    // hide InnerPortal from unauthenticated users
    if (this.canShowContent()) {
      return (
        <div className={styles.innerPortal}>

          <ApplicationBar
            title={this.props.fleet}
            toggleSidebar={this.toggleSidebar}
            logout={this.onLogout}
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

CustomerPortal.propTypes = {
  children: PropTypes.node.isRequired,
  fleet: PropTypes.string,
  // projectIsReady: PropTypes.bool.isRequired,
  // fetchSpecificData: PropTypes.func.isRequired,
  // auth: PropTypes.shape({
  //   logout: PropTypes.func.isRequired,
  // }).isRequired,
};

CustomerPortal.defaultProps = {
  fleet: '',
};

export default CustomerPortal;
