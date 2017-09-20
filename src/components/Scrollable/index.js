import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

import styles from './styles.css';

const Scrollable = ({
  children,
  offsetTop,
}, {
  muiTheme,
}) => {
  const st = { top: offsetTop !== undefined ? offsetTop : muiTheme.spacing.powerlistFilterHeight };

  return (
    <div
      className={styles.scrollable}
      style={st}
    >
      {children}
    </div>
  );
};

Scrollable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

Scrollable.propTypes = {
  children: PropTypes.node.isRequired,
  offsetTop: PropTypes.number,
};

Scrollable.defaultProps = {
  offsetTop: undefined,
};

export default pure(Scrollable);
