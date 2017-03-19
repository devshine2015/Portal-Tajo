import React from 'react';
import { css } from 'aphrodite/no-important';

import classes from './classes';

const Control = ({ children, sizes }) => (
  <div
    className={css(classes.control)}
    style={sizes}
  >
    { children }
  </div>
);

Control.propTypes = {
  children: React.PropTypes.any.isRequired,
  sizes: React.PropTypes.shape({
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  }),
};

Control.defaultProps = {
  sizes: {},
};

const CustomControls = ({
  children,
}) => (
  <div className={css(classes.customControls)}>
    { children }
  </div>
);

CustomControls.propTypes = {
  children: React.PropTypes.any,
};
CustomControls.Control = Control;

export default CustomControls;
