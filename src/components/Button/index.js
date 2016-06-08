import React from 'react';
import classnames from 'classnames';
import pure from 'recompose/pure';
import getModifiers from 'utils/classNameModifiers';
import Loader from 'components/Loader';

import styles from './styles.css';

const LoaderWrapper = ({ children }) => (
  <div className={styles.loaderWrapper}>
    { children }
  </div>
);

const Button = ({
  inlineClass,
  loader = false,
  modifierClass,
  onClick = () => ({}),
  text = 'Submit',
  type = 'button',
  ...rest
}) => {
  const modifiers = getModifiers(modifierClass, styles);
  const className = classnames(styles.button, modifiers, inlineClass);

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {text}
      {
        loader && (
        <LoaderWrapper >
          {loader}
        </LoaderWrapper>
      )}
    </button>
  );
};

Button.propTypes = {
  inlineClass: React.PropTypes.string,
  loader: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.instanceOf(Loader),
  ]),
  modifierClass: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default pure(Button);