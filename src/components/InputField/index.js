import React from 'react';
import classnames from 'classnames';
import pure from 'recompose/pure';
import getModifiers from 'utils/classNameModifiers';

import styles from './styles.css';

const InputField = ({
  inlineClass,
  modifierClass,
  type = 'text',
  ...rest
}) => {
  const modifiers = getModifiers(modifierClass, styles);
  const cn = classnames(styles.control, modifiers, inlineClass);

  return (
    <input type={type} {...rest} className={cn} />
  );
};

InputField.propTypes = {
  inlineClass: React.PropTypes.string,
  modifierClass: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default pure(InputField);