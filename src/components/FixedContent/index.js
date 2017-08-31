import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const FixedContent = ({
  children,
  containerClassName,
}) => {
  const newClassName = classnames(styles.fixedContent, containerClassName);

  return (
    <div className={newClassName}>
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
