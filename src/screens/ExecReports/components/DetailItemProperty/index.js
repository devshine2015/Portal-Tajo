import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';

const DetailItemProperty = ({
  title,
  icon,
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
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  icon: React.PropTypes.object,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
};

DetailItemProperty.defaultProps = {
  icon: null,
};

export default pure(DetailItemProperty);
