import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const FixedColumn = ({
  children,
  containerClassName,
  style,
}, {
  muiTheme,
}) => {
  const STYLES = {
    container: {
      top: muiTheme.spacing.appBarHeigth,
    },
  };
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

FixedColumn.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

FixedColumn.propTypes = {
  children: React.PropTypes.any.isRequired,
  containerClassName: React.PropTypes.string,
  style: React.PropTypes.object,
};

FixedColumn.defaultProps = {
  containerClassName: '',
  style: {},
};

export default pure(FixedColumn);
