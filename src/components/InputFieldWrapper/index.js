import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.node.isRequired,
  inlineClass: PropTypes.string,
  style: PropTypes.object,
};

InputFieldWrapper.defaultProps = {
  inlineClass: '',
  style: {},
};

export default pure(InputFieldWrapper);
