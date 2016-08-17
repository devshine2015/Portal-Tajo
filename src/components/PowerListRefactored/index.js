import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import FixedColumn from 'components/FixedColumn';
import styles from './styles.css';

const PowerList = (props) => {
  const columnClassName = classnames(styles.columnContainer, props.className);

  return (
    <FixedColumn containerClassName={columnClassName}>
      <div className={styles.powerlist}>
        {props.children}
      </div>
    </FixedColumn>
  );
};

PowerList.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
};

export default pure(PowerList);
