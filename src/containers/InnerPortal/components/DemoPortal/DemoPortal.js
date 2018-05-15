/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

import FleetSelector from 'components/FleetSelector';
import makeInnerPortal from '../Main';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import styles from './styles.css';

const Title = props => (
  <div>
    { props.children }
  </div>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

const FleetSwitcher = props => (
  <FleetSelector
    fleetReadyState="ready"
    selectedFleet={props.selectedFleet}
    onSelect={props.onFleetChange}
  />
);

FleetSwitcher.propTypes = {
  onFleetChange: PropTypes.func.isRequired,
  selectedFleet: PropTypes.string.isRequired,
};

const DemoPortal = props => (
  <div className={styles.portalWrapper}>

    <TopBar
      route={props.route}
      logout={props.logout}
    />

    <Navigation />

    { props.children }

  </div>
);

DemoPortal.propTypes = {
  route: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

DemoPortal.defaultProps = {
  fleet: '',
};

export default makeInnerPortal()(DemoPortal);
