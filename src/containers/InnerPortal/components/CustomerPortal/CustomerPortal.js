/* eslint-disable global-require */

import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'aphrodite/no-important';
import { List } from 'immutable';
import { isMwa } from 'configs';
import { authorizeWithRole } from 'utils/authz';
import AppBar from 'components/AppBar';
import FleetSelector from 'components/FleetSelector';
import CodebaseVersion from 'components/CodebaseVersion';
import makeInnerPortal from '../Main';
import MainSidebar from '../MainSidebar';
import RightElement from './AppBarRightElement';
import classes from './classes';

const canChangeFleet = () => authorizeWithRole('uber');

const Title = props => (
  <div className={css(classes.titleElement)}>
    { props.children }
    { canChangeFleet() && (
      <FleetSelector
        fleetReadyState="ready"
        fleets={new List(['demo', 'psl'])}
        onSelect={props.onFleetChange}
      />
    )}
  </div>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
  onFleetChange: PropTypes.func.isRequired,
};

function renderTitle(title, onFleetChange) {
  if (isMwa) {
    return (
      <Title onFleetChange={onFleetChange}>
        <img src={require('assets/images/logos/mwa/mwa.png')} alt="mwa logo" height="60" width="76" />
      </Title>
    );
  }
  return (
    <Title onFleetChange={onFleetChange}>
      <div className={css(classes.withCodename)}>
        { title }
        <CodebaseVersion />
      </div>
    </Title>
  );
}

const CustomerPortal = (props) => {
  return (
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
};

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
