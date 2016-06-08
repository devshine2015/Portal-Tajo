import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const InputFieldWrapper = ({
  children,
  inlineClass,
}) => {
  const componentClassName = classnames(styles.controlWrapper, inlineClass);

  return (
    <div className={componentClassName}>
      {children}
    </div>
  );
};

InputFieldWrapper.propTypes = {
  children: React.PropTypes.node.isRequired,
  inlineClass: React.PropTypes.string,
};

export default pure(InputFieldWrapper);