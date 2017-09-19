import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import ccLogo from 'assets/images/logos/cc/cc_logo.png';
import fusoLogo from 'assets/images/logos/cc/fuso_logo.png';
import AppBar from 'components/AppBar';
import makeInnerPortal from '../Main';
// import MainSidebar from '../MainSidebar';
import classes from './classes';

function renderTitle() {
  return (
    <div className={css(classes.logos)}>
      <img
        src={fusoLogo}
        alt=""
        className={css(classes.logo)}
      />
      <img
        src={ccLogo}
        alt="cycle&carriage"
        className={css(classes.logo)}
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
