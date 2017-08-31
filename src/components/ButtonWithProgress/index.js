import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import DefButton from 'material-ui/RaisedButton';
import styles from './styles.css';

const defIconName = 'fa fa-spinner fa-pulse';

const STYLES = {
  overlay: {
    padding: '0 20px',
  },
};

const DefProgress = ({ iconClassName }) => {
  const className = cs(iconClassName, styles.icon);

  return <i className={className} />;
};

DefProgress.propTypes = {
  iconClassName: PropTypes.string,
};

DefProgress.defaultProps = {
  iconClassName: defIconName,
};

const ButtonWithProgress = ({
  isLoading,
  iconClassName,
  customIcon,
  overlayStyle,
  ...rest,
}) => {
  const btnOverlayStyle = isLoading ?
    Object.assign({}, STYLES.overlay, overlayStyle) : {};

  return (
    <DefButton
      {...rest}
      overlayStyle={btnOverlayStyle}
      icon={isLoading && (customIcon || <DefProgress iconClassName={iconClassName} />)}
      labelPosition="before"
    />
  );
};

ButtonWithProgress.propTypes = {
  // display progress if tue.
  // false by default
  isLoading: PropTypes.bool.isRequired,

  // additional className fro the button overlay element
  overlayStyle: PropTypes.object,

  // render custom icon instead of default
  customIcon: PropTypes.element,

  // override className of default icon
  iconClassName: PropTypes.string,
};

ButtonWithProgress.defaultProps = {
  iconClassName: '',
  customIcon: null,
  overlayStyle: '',
};

export default ButtonWithProgress;
