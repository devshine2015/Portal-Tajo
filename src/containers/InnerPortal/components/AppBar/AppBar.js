import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import MUIAppBar from 'material-ui/AppBar';
import AppBarRightElement from '../AppBarRightElement/AppBarRightElement';

import styles from './styles.css';

const STYLES = {
  title: {
    lineHeight: 'inherit',
  },
  right: {
    marginTop: 0,
    display: 'flex',
  },
};

const AppBar = ({
  title,
  toggleSidebar,
  logout,
  withJournal,
}) => (
  <div className={styles.barContainer}>
    <MUIAppBar
      title={title}
      iconElementRight={(
        <AppBarRightElement
          withJournal={withJournal}
          onClick={logout}
        />
      )}
      iconStyleRight={STYLES.right}
      titleStyle={STYLES.title}
      className={styles.bar}
      zDepth={0}
      onLeftIconButtonTouchTap={toggleSidebar}
    />
  </div>
);

AppBar.propTypes = {
  title: PropTypes.element.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  withJournal: PropTypes.bool,
};
AppBar.defaultProps = {
  withJournal: true,
};

const PureAppBar = pure(AppBar);

export default PureAppBar;
