import React from 'react';
import PropTypes from 'prop-types';
import { isMwa } from 'configs';
import CodebaseVersion from 'components/CodebaseVersion';
import SnackbarNotification from 'containers/Snackbar';
import AppBar from '../AppBar';
import MainSidebar from '../MainSidebar';
import makeInnerPortal from './Main';
import styles from './styles.css';

function renderTitle(title) {
  if (isMwa) {
    return (
      <div className={styles.title}>
        <img src={require('assets/images/logos/mwa/mwa.png')} alt="mwa logo" height="60" width="76" />
      </div>
    );
  }
  return (
    <div className={styles.title}>
      { title }
      <CodebaseVersion />
    </div>
  );
}

const CustomerPortal = (props) => {
  return (
    <div className={styles.innerPortal}>

      <AppBar
        title={renderTitle(props.fleet)}
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
};

CustomerPortal.propTypes = {
  children: PropTypes.node.isRequired,
  fleet: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

CustomerPortal.defaultProps = {
  fleet: '',
};

export default makeInnerPortal()(CustomerPortal);
