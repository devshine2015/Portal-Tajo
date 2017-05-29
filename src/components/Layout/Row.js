import React from 'react';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';

import classes from './classes.js';

const Row = ({ children, className, style }) => {
  const nextClassName = cs(css(classes.row), className);

  return (
    <div
      className={nextClassName}
      style={style}
    >
      { children }
    </div>
  );
};

Row.propTypes = {
  children: React.PropTypes.any.isRequired,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

Row.defaultProps = {
  className: '',
  style: {},
};

export default Row;
