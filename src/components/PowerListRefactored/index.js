import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import FixedColumn from 'components/FixedColumn';
import styles from './styles.css';

const PowerList = ({
  children = null,
  className,
  content = null,
  filter = null,
}) => {
  const columnClassName = classnames(styles.columnContainer, className);
  const child = children || ([
    filter || null,
    content,
  ]);

  return (
    <FixedColumn containerClassName={columnClassName}>
      { child }
    </FixedColumn>
  );
};

PowerList.propTypes = {
  children: React.PropTypes.element,
  className: React.PropTypes.string,
  content: React.PropTypes.element,
  filter: React.PropTypes.element,
};

export default pure(PowerList);
