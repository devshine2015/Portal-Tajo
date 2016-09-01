import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { dimensions } from 'configs/theme';

import styles from './styles.css';

const STYLES = {
  container: {
    top: dimensions.appBarHeigth,
  },
};

const FixedColumn = ({
  children,
  containerClassName,
  style,
}) => {
  const newClassName = classnames(styles.column, containerClassName);
  const st = Object.assign({}, STYLES.container, style);

  return (
    <div
      className={newClassName}
      style={st}
    >
      {children}
    </div>
  );
};

FixedColumn.propTypes = {
  children: React.PropTypes.any.isRequired,
  containerClassName: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default pure(FixedColumn);
