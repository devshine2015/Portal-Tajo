import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const Form = ({
  children,
  className,
  name,
  onSubmit,
  refs,
  ...rest,
}) => {
  const formClassName = classnames(styles.form, className);

  return (
    <form
      className={formClassName}
      name={name}
      onSubmit={onSubmit}
      refs={refs}
      {...rest}
    >
      {children}
    </form>
  );
}

Form.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
  name: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  refs: React.PropTypes.string.isRequired,
};

export default pure(Form);