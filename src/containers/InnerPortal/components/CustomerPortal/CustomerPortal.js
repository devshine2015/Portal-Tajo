/* eslint-disable global-require */

import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'aphrodite/no-important';
import { isMwa } from 'configs';
import AppBar from 'components/AppBar';
import FleetSelector from 'components/FleetSelector';
import CodebaseVersion from 'components/CodebaseVersion';
import makeInnerPortal from '../Main';
import MainSidebar from '../MainSidebar';
import RightElement from './AppBarRightElement';
import classes from './classes';

const Title = props => (
  <div className={css(classes.titleElement)}>
    { props.children }
    <FleetSelector />
  </div>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

function renderTitle(title) {
  if (isMwa) {
    return (
      <Title>
        <img src={require('assets/images/logos/mwa/mwa.png')} alt="mwa logo" height="60" width="76" />
      </Title>
    );
  }
  return (
    <Title>
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
        title={renderTitle(props.fleet)}
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
};

CustomerPortal.defaultProps = {
  fleet: '',
};

export default makeInnerPortal()(CustomerPortal);
