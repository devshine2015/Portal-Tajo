import React from 'react';
import { css } from 'aphrodite/no-important';

import classes from './classes';

const Overlay = ({ children, style }) => (
  <div className={css(classes.overlay)} style={style}>
    <div className={css(classes.overlay__inn)}>
      { children }
    </div>
  </div>
);

Overlay.propTypes = {
  children: React.PropTypes.any,
  style: React.PropTypes.object,
};

Overlay.defaultProps = {
  children: null,
  style: undefined,
};

export default Overlay;
