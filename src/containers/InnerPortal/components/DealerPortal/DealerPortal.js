import React from 'react';
import PropTypes from 'prop-types';
// import { css } from 'aphrodite/no-important';
import ccLogo from 'assets/images/logos/cc/cc_logo.png';
import fusoLogo from 'assets/images/logos/cc/fuso_logo.png';
import makeInnerPortal from '../Main';
import AppBar from '../AppBar';
// import MainSidebar from '../MainSidebar';
// import classes from './classes';

function renderTitle() {
  return (
    <div>
      <img
        src={ccLogo}
        alt="cycle&carriage"
      />
      <img
        src={fusoLogo}
        alt=""
      />
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
        withJournal={false}
      />

      {/* <MainSidebar
        isOpened={props.isSidebarOpen}
        toggleSidebar={props.toggleSidebar}
      /> */}

      { /* props.children */ }

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
