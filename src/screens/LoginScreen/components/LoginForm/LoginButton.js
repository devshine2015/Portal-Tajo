import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AnimatedLogo from 'components/animated';
import classes, { LOGIN_BUTTON_SIZE } from './classes';

const STYLES = {
  button: {
    width: LOGIN_BUTTON_SIZE,
    height: LOGIN_BUTTON_SIZE,
    paddingLeft: 18,
    background: 'inherit',
  },
  icon: {
    width: LOGIN_BUTTON_SIZE / 2.5,
    height: LOGIN_BUTTON_SIZE / 2.5,
  },
};

const Btn = (props) => (
  <IconButton
    disabled={props.isLoading}
    type="submit"
    onClick={props.onClick}
    style={STYLES.button}
    iconStyle={STYLES.icon}
    className={css(classes.loginButton)}
  >
    <SendIcon />
  </IconButton>
);

Btn.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const LoginButton = (props) => {
  const wrapperClassName = css(
    classes.loginButton__wrapper,
    props.isLoading && classes.loginButton__wrapper_disabled,
  );

  const icon = props.isLoading ? (
    <AnimatedLogo.LoadingLogo
      radius={20}
      showText={false}
      logoColor="#aaaaaa"
    />
  ) : <Btn {...props} />;

  return (
    <div className={wrapperClassName}>
      { icon }
    </div>
  );
};

LoginButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoginButton;
