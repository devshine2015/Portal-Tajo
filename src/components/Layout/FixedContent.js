import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
// import cs from 'classnames';
import classnames from 'classnames';

import { css } from 'aphrodite/no-important';
import classes from './classes';

const FixedContent = ({
  children,
  containerClassName,
}) => {
  const className = classnames(css(classes.fixedContent), containerClassName);

  return (
    <div className={className}>
      {children}
    </div>
  );
};

FixedContent.propTypes = {
  children: PropTypes.any.isRequired,
  containerClassName: PropTypes.string,
};

FixedContent.defaultProps = {
  containerClassName: '',
};

export default pure(FixedContent);
