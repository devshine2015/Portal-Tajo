import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Drawer from 'material-ui/Drawer';
import { getDashboardPages } from 'containers/InnerPortal/reducer';
import MainMenu from '../MainMenu';

import styles from './styles.css';

const MainSidebar = ({
  isOpened,
  pages,
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
      />
    </Drawer>
  );
};

MainSidebar.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  pages: PropTypes.array,
  toggleSidebar: PropTypes.func.isRequired,
};

MainSidebar.defaultProps = {
  pages: [],
};

const mapState = state => ({
  pages: getDashboardPages(state).toArray(),
});
const mapDispatch = null;

const PureMainSidebar = pure(MainSidebar);

export default connect(mapState, mapDispatch)(PureMainSidebar);
