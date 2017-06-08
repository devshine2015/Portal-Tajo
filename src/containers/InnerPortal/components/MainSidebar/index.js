import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Drawer from 'material-ui/Drawer';
import { rolesEnum } from 'configs/roles';
import { getDashboardPages } from 'containers/InnerPortal/reducer';
import { getUserRole } from 'services/Session/reducer';
import MainMenu from '../MainMenu';

import styles from './styles.css';

const MainSidebar = ({
  isOpened,
  pages,
  role,
  toggleSidebar,
}) => {
  if (pages.length === 0) {
    return null;
  }

  return (
    <Drawer
      docked={false}
      open={isOpened}
      containerClassName={styles.drawer}
      zDepth={1}
      onRequestChange={toggleSidebar}
    >
      <MainMenu
        pages={pages}
        closeSidebar={toggleSidebar}
        role={role}
      />
    </Drawer>
  );
};

MainSidebar.propTypes = {
  isOpened: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.array,
  toggleSidebar: React.PropTypes.func.isRequired,
  role: React.PropTypes.oneOf(rolesEnum),
};

MainSidebar.defaultProps = {
  pages: [],
  role: 'admin',
};

const mapState = state => ({
  pages: getDashboardPages(state).toArray(),
  role: getUserRole(state),
});
const mapDispatch = null;

const PureMainSidebar = pure(MainSidebar);

export default connect(mapState, mapDispatch)(PureMainSidebar);
