import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const FixedColumn = ({
  children,
  containerClassName,
}) => {
  const newClassName = classnames(styles.column, containerClassName);

  return (
    <div className={newClassName}>
      {children}
    </div>
  );
};

FixedColumn.propTypes = {
  children: React.PropTypes.any.isRequired,
  containerClassName: React.PropTypes.string,
};

export default pure(FixedColumn);
