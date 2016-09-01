import React from 'react';
import pure from 'recompose/pure';

import styles from './styles.css';

const Scrollable = ({
  children,
  offsetTop = 0,
}) => {
  const st = { top: offsetTop };

  return (
    <div
      className={styles.scrollable}
      style={st}
    >
      {children}
    </div>
  );
};

Scrollable.propTypes = {
  children: React.PropTypes.node.isRequired,
  offsetTop: React.PropTypes.number.isRequired,
};

export default pure(Scrollable);
