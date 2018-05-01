import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import styles from './styles.css';

const DetailItemProperty = ({
  title,
  icon,
  value,
}) => (
  <div className={styles.propContainer}>
    <span >
      {title === '' ? icon : `${title}:`}
    </span>
    <span >
      {value}
    </span>
  </div>
);

DetailItemProperty.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

DetailItemProperty.defaultProps = {
  icon: null,
};

export default pure(DetailItemProperty);
