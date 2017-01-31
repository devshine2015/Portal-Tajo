import React from 'react';
import { css } from 'aphrodite/no-important';

import classes from './Row.classes.js';

const Row = ({ children }) => (
  <div className={css(classes.row)}>
    { children }
  </div>
);

Row.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default Row;
