import React from 'react';
import pure from 'recompose/pure';

import styles from './styles.css';

const Scrollable = ({
  children,
  offsetTop,
}, {
  muiTheme,
}) => {
  const st = { top: offsetTop || muiTheme.spacing.powerlistFilterHeight };

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
  muiTheme: React.PropTypes.object.isRequired,
};

Scrollable.propTypes = {
  children: React.PropTypes.node.isRequired,
  offsetTop: React.PropTypes.number,
};

Scrollable.defaultProps = {
  offsetTop: undefined,
};

export default pure(Scrollable);
