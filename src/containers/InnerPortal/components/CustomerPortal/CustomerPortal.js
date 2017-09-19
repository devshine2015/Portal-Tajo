import PropTypes from 'prop-types';
import React from 'react';
import { isMwa } from 'configs';
import CodebaseVersion from 'components/CodebaseVersion';
import makeInnerPortal from '../Main';
import AppBar from '../AppBar';
import MainSidebar from '../MainSidebar';
// import classes from './classes';

function renderTitle(title) {
  if (isMwa) {
    return (
      <div>
        <img src={require('assets/images/logos/mwa/mwa.png')} alt="mwa logo" height="60" width="76" />
      </div>
    );
  }
  return (
    <div>
      { title }
      <CodebaseVersion />
    </div>
  );
}

const CustomerPortal = (props) => {
  return (
    <div style={{ height: '100%' }}>

      <AppBar
        title={renderTitle(props.fleet)}
        toggleSidebar={props.toggleSidebar}
        logout={props.logout}
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
