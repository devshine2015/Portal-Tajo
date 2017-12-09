/* eslint-disable global-require */

import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'aphrodite/no-important';
import { isMwa, isSCC } from 'configs';
import { authorizeWithRole } from 'utils/authz';
import AppBar from 'components/AppBar';
import FleetSelector from 'components/FleetSelector';
import CodebaseVersion from 'components/CodebaseVersion';
import makeInnerPortal from '../Main';
import MainSidebar from '../MainSidebar';
import RightElement from './AppBarRightElement';
import classes from './classes';
import allFleets from './allFleets';

import sccLogo from 'assets/images/logos/scc/scc_logo.png';

// const sccLogo = require('assets/images/logos/scc/scc_logo_appbar.png');

const canChangeFleet = () => authorizeWithRole('uber');

const Title = props => (
  <div className={css(classes.titleElement)}>
    { props.children }
  </div>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

const FleetSwitcher = props => (
  <FleetSelector
    fleetReadyState="ready"
    fleets={allFleets}
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
        { canChangeFleet() && <FleetSwitcher selectedFleet={fleetName} onFleetChange={onFleetChange} /> }
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
      <div className={css(classes.withCodename)}>
        { fleetName }
        <CodebaseVersion />
      </div>
      { canChangeFleet() && <FleetSwitcher selectedFleet={fleetName} onFleetChange={onFleetChange} /> }
    </Title>
  );
}

const CustomerPortal = props => (
  <div style={{ height: '100%' }}>

    <AppBar
      title={renderTitle(props.fleet, props.changeFleet)}
      toggleSidebar={props.toggleSidebar}
      logout={props.logout}
      rightElement={<RightElement />}
    />

    <MainSidebar
      isOpened={props.isSidebarOpen}
      toggleSidebar={props.toggleSidebar}
    />

    { props.children }

  </div>
);

CustomerPortal.propTypes = {
  children: PropTypes.node.isRequired,
  fleet: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  changeFleet: PropTypes.func.isRequired,
};

CustomerPortal.defaultProps = {
  fleet: '',
};

export default makeInnerPortal()(CustomerPortal);
