import React from 'react';
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
  children: React.PropTypes.any.isRequired,
  containerClassName: React.PropTypes.string,
};

FixedContent.defaultProps = {
  containerClassName: '',
};

export default pure(FixedContent);
