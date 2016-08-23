import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';

const DetailItemProperty = ({
  title,
  value,
}) => (
  <div className={styles.propContainer}>
    <span className={styles.propTitle}>
      {`${title}:`}
    </span>
    <span className={styles.propValue}>
      {value}
    </span>
  </div>
);

DetailItemProperty.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
};

export default pure(DetailItemProperty);
