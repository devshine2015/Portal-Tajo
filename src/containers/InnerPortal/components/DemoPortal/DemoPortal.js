/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { isMwa, isSCC } from 'configs';
import { authorizeWithRole } from 'utils/authz';

import FleetSelector from 'components/FleetSelector';
import CodebaseVersion from 'components/CodebaseVersion';
import makeInnerPortal from '../Main';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import styles from './styles.css';

const canChangeFleet = () => authorizeWithRole('uber');

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

// TODO: make it generic, keep logis in the /projects/.. for each project
function renderTitle(fleetName, onFleetChange) {
  if (isMwa) {
    return (
      <Title onFleetChange={onFleetChange}>
        <img src={require('assets/images/logos/mwa/mwa.png')} alt="mwa logo" height="60" width="76" />
        { false && <FleetSwitcher selectedFleet={fleetName} onFleetChange={onFleetChange} /> }
      </Title>
    );
  }
  if (isSCC) {
    return (
      <Title onFleetChange={onFleetChange}>
        <img src={sccLogo} alt="scc logo" height="60" width="180" />
        { canChangeFleet() && <FleetSwitcher selectedFleet={fleetName} onFleetChange={onFleetChange} /> }
      </Title>
    );
  }
  return (
    <Title onFleetChange={onFleetChange}>
      <div>
        { fleetName }
        <CodebaseVersion />
      </div>
      { canChangeFleet() && <FleetSwitcher selectedFleet={fleetName} onFleetChange={onFleetChange} /> }
    </Title>
  );
}

const DemoPortal = props => (
  <div className={styles.portalWrapper}>

    <TopBar route={props.route} logout={props.logout} />

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
