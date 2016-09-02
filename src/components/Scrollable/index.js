import React from 'react';
import pure from 'recompose/pure';
import { dimensions } from 'configs/theme';

import styles from './styles.css';

const Scrollable = ({
  children,
  offsetTop = dimensions.powerlistFilterHeight,
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
  offsetTop: React.PropTypes.number,
};

export default pure(Scrollable);
