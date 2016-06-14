import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const Toaster = ({
  isError,
  show,
  text,
}) => {
  const className = classnames(styles.toaster, {
    [styles.toaster_show]: true,
    [styles.toaster_error]: isError,
  });

  return (
    <div className={className}>
      {text}
    </div>
  );
};

Toaster.propTypes = {
  isError: React.PropTypes.bool.isRequired,
  show: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string,
};

export default pure(Toaster);
