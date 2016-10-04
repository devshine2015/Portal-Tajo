import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const InputFieldWrapper = ({
  children,
  inlineClass,
  style,
}) => {
  const componentClassName = classnames(styles.controlWrapper, inlineClass);

  return (
    <div className={componentClassName} style={style}>
      {children}
    </div>
  );
};

InputFieldWrapper.propTypes = {
  children: React.PropTypes.node.isRequired,
  inlineClass: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default pure(InputFieldWrapper);
