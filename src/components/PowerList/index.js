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
  fixed = true,
}) => {
  const columnClassName = classnames('powerlist', styles.columnContainer, className, {
    [styles.likeStatic]: !fixed,
  });

  return (
    <FixedColumn containerClassName={columnClassName}>
      { children || (
        <div>
          {filter || null}
          {content}
        </div>
      )}
    </FixedColumn>
  );
};

PowerList.propTypes = {
  children: React.PropTypes.element,
  className: React.PropTypes.string,
  content: React.PropTypes.element,
  filter: React.PropTypes.element,
  fixed: React.PropTypes.bool,
};

export default pure(PowerList);
