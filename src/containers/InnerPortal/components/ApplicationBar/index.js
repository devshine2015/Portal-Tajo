import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { isMwa } from 'configs';
import CodebaseVersion from 'components/CodebaseVersion';
import mwaLogo from 'assets/images/logos/mwa/mwa.png';
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

function renderTitle(title) {
  if (isMwa) {
    return (
      <div className={styles.title}>
        <img src={mwaLogo} alt="mwa logo" height="60" width="76" />
      </div>
    );
  }
  return (
    <div className={styles.title}>
      { title }
      <CodebaseVersion />
    </div>
  );
}

const ApplicationBar = ({
  title,
  toggleSidebar,
  accessToken,
}) => (
  <div className={styles.barContainer}>
    <AppBar
      title={renderTitle(title)}
      iconElementRight={<AppBarRightElement accessToken={accessToken} />}
      iconStyleRight={STYLES.right}
      titleStyle={STYLES.title}
      className={styles.bar}
      zDepth={0}
      onLeftIconButtonTouchTap={toggleSidebar}
    />
  </div>
);

ApplicationBar.propTypes = {
  title: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  accessToken: React.PropTypes.string.isRequired,
};

const PureApplicationBar = pure(withRouter(ApplicationBar));

export default PureApplicationBar;
