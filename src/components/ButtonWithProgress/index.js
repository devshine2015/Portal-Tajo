import React from 'react';
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
  iconClassName: React.PropTypes.string,
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
  isLoading: React.PropTypes.bool.isRequired,

  // additional className fro the button overlay element
  overlayStyle: React.PropTypes.string,

  // render custom icon instead of default
  customIcon: React.PropTypes.element,

  // override className of default icon
  iconClassName: React.PropTypes.string,
};

ButtonWithProgress.defaultProps = {
  iconClassName: '',
  customIcon: null,
  overlayStyle: {},
};

export default ButtonWithProgress;
