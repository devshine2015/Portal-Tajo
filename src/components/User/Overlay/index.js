import React from 'react';
import PropTypes from 'prop-types';
import CssProps from 'react-style-proptype'; // eslint-disable-line import/no-extraneous-dependencies
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
  children: PropTypes.node,
  style: CssProps,
};

Overlay.defaultProps = {
  children: null,
  style: undefined,
};

export default Overlay;
