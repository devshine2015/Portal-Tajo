import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Row.defaultProps = {
  className: '',
  style: {},
};

export default Row;
