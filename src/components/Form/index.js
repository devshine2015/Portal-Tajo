import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const Form = ({
  children,
  className,
  name,
  onSubmit,
  ...rest,
}) => {
  const formClassName = classnames(styles.form, className);

  return (
    <form
      className={formClassName}
      name={name}
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  className: '',
};

export default pure(Form);
