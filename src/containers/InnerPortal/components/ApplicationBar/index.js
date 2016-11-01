import React from 'react';
import pure from 'recompose/pure';
import { withRouter } from 'react-router';
import locationShape from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { changeMainSidebarState } from 'containers/InnerPortal/actions';
import { REACT_ROUTER_ROOT, portal } from 'configs';
import FleetSummary from '../FleetSummary';
import { logout } from '../../actions';

import styles from './styles.css';

const hideSummaryOn = [
  `${REACT_ROUTER_ROOT}dashboard`,
  portal === 'tajo' && REACT_ROUTER_ROOT,
];

function renderSummary(location) {
  const hide = hideSummaryOn.indexOf(location.pathname) !== -1;

  if (hide) {
    return null;
  }

  return (
    <div className={styles.centerContainer}>
      <FleetSummary />
    </div>
  );
}

const ApplicationBar = ({
  logout, // eslint-disable-line no-shadow
  title,
  toggleSidebar,
  location,
}) => (
  <div className={styles.barContainer}>
    <AppBar
      title={title}
      iconElementRight={
        <FlatButton
          label="Logout"
          onClick={logout}
        />
      }
      className={styles.bar}
      zDepth={0}
      onLeftIconButtonTouchTap={toggleSidebar}
      children={ renderSummary(location) }
    />
  </div>
);

ApplicationBar.propTypes = {
  logout: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape(locationShape).isRequired,
};

const mapState = null;
const mapDispatch = {
  logout,
  toggleSidebar: changeMainSidebarState,
};

const PureApplicationBar = pure(withRouter(ApplicationBar));

export default connect(mapState, mapDispatch)(PureApplicationBar);
