import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import styles from './styles.css';

const DetailItemProperty = ({
  title,
  value,
}) => (
  <tr className={styles.row}>
    <td className={styles.titleCell}>{title}</td>
    <td className={styles.valueCell}>{value}</td>
  </tr>

  /*<div className={styles.propContainer}>
    <span >
      {title === '' ? icon : `${title}:`}
    </span>
    <span >
      {title}
    </span>
  </div>*/
);

DetailItemProperty.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default pure(DetailItemProperty);
