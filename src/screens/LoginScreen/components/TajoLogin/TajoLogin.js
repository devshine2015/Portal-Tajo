import React from 'react';
import { css } from 'aphrodite/no-important';
import LoginForm from '../LoginForm';
import classes from './classes';

const STYLES = {
  loginForm: {
    marginTop: 130,
  },
};

const CustomerLogin = props => (
  <div className={css(classes.page)}>
    <LoginForm
      containerStyles={STYLES.loginForm}
      {...props}
    />
  </div>
);

export default CustomerLogin;
