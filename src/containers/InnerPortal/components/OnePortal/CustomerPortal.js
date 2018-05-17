/* eslint-disable global-require */

import PropTypes from 'prop-types';
import React from 'react';
import makeInnerPortal from '../Main';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import styles from './styles.css';

const OnePortal = props => (
  <div className={styles.portalWrapper}>
    <TopBar
      route={props.route}
      logout={props.logout}
    />
    <Navigation />

    { props.children }

  </div>
);

OnePortal.propTypes = {
  children: PropTypes.node.isRequired,
  fleet: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  changeFleet: PropTypes.func.isRequired,
};

OnePortal.defaultProps = {
  fleet: '',
};

export default makeInnerPortal()(OnePortal);
