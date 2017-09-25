import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import AppBar from 'components/AppBar';
import makeInnerPortal from '../Main';
import RightElement from './AppBarRightElement';
import MainSidebar from '../MainSidebar';
import Logos from './Logos';
import classes from './classes';

function renderTitle() {
  return (
    <div className={css(classes.titleElement)}>
      <Logos />
    </div>
  );
}

const DealerPortal = (props) => {
  return (
    <div style={{ height: '100%' }}>

      <AppBar
        title={renderTitle()}
        toggleSidebar={props.toggleSidebar}
        logout={props.logout}
        rightElement={<RightElement />}
      />

      <MainSidebar
        isOpened={props.isSidebarOpen}
        toggleSidebar={props.toggleSidebar}
      />

      {props.children}

    </div>
  );
};

DealerPortal.propTypes = {
  children: PropTypes.node.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default makeInnerPortal()(DealerPortal);
