import React from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const Content = ({ children }) => (
  <div className={css(classes.content)}>
    { children }
  </div>
);

Content.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default Content;
