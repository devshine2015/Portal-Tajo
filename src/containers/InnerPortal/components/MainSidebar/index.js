import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Drawer from 'material-ui/Drawer';
import MainMenu from 'components/MainMenu';
import { getDashboardPages, getSidebarState } from 'containers/InnerPortal/reducer';
import { changeMainSidebarState } from 'containers/InnerPortal/actions';

import styles from './styles.css';

const MainSidebar = ({
  open,
  pages,
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
      />
    </Drawer>
  );
};

MainSidebar.propTypes = {
  open: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      path: React.PropTypes.string.isRequired,
    })
  ),
  toggleSidebar: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  pages: getDashboardPages(state).toArray(),
  open: getSidebarState(state),
});
const mapDispatch = {
  toggleSidebar: changeMainSidebarState,
};

const PureMainSidebar = pure(MainSidebar);

export default connect(mapState, mapDispatch)(PureMainSidebar);
