import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.any,
  style: PropTypes.object,
};

Overlay.defaultProps = {
  children: null,
  style: undefined,
};

export default Overlay;
