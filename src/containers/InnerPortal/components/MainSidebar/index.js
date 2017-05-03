import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Drawer from 'material-ui/Drawer';
import { rolesEnum } from 'configs/roles';
import MainMenu from '../MainMenu';
import { getDashboardPages, getSidebarState } from 'containers/InnerPortal/reducer';
import { changeMainSidebarState } from 'containers/InnerPortal/actions';
import { getUserRole } from 'services/Session/reducer';

import styles from './styles.css';

const MainSidebar = ({
  open,
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
      open={open}
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
  open: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.array,
  toggleSidebar: React.PropTypes.func.isRequired,
  role: React.PropTypes.oneOf(rolesEnum).isRequired,
};

MainSidebar.defaultProps = {
  pages: [],
};

const mapState = (state) => ({
  pages: getDashboardPages(state).toArray(),
  open: getSidebarState(state),
  role: getUserRole(state),
});
const mapDispatch = {
  toggleSidebar: changeMainSidebarState,
};

const PureMainSidebar = pure(MainSidebar);

export default connect(mapState, mapDispatch)(PureMainSidebar);
