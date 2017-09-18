import React from 'react';
import PropTypes from 'prop-types';
import AnimatedLogo from 'components/animated';
import SnackbarNotification from 'containers/Snackbar';
import ApplicationBar from '../ApplicationBar';
import MainSidebar from '../MainSidebar';
import makeInnerPortal from './Main';
import styles from './styles.css';

const CustomerPortal = (props) => {
  // hide InnerPortal from unauthenticated users
  if (props.canShowContent()) {
    return (
      <div className={styles.innerPortal}>

        <ApplicationBar
          title={props.fleet}
          toggleSidebar={props.toggleSidebar}
          logout={props.logout}
        />

        <MainSidebar
          isOpened={props.isSidebarOpen}
          toggleSidebar={props.toggleSidebar}
        />

        <div className={styles.content}>
          {props.children}
        </div>

        {/* absolutely positioned stuff */}
        <SnackbarNotification />

      </div>
    );
  }

  return <AnimatedLogo.FullscreenLogo />;
};

CustomerPortal.propTypes = {
  children: PropTypes.node.isRequired,
  fleet: PropTypes.string,
  canShowContent: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

CustomerPortal.defaultProps = {
  fleet: '',
};

export default makeInnerPortal()(CustomerPortal);
