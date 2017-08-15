import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const ForgotPassword = ({
  onClick,
}) => {
  return (
    <div className={css(classes.forgot)}>
      <button
        role="link"
        className={css(classes.forgot__link)}
        onClick={onClick}
      >
        Forgot password?
      </button>
    </div>
  );
};

ForgotPassword.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ForgotPassword;
