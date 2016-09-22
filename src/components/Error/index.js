import React from 'react';
import pure from 'recompose/pure';

import styles from './styles.css';

const Error = ({ message }) => (
  <div className={styles.error}>
    {message}
  </div>
);

Error.propTypes = {
  message: React.PropTypes.string.isRequired,
};

export default pure(Error);
