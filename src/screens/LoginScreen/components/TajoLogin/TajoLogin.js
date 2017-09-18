import React from 'react';
import { css } from 'aphrodite/no-important';
import LoginForm from '../LoginForm';
import DrvrFooter from '../DrvrFooter';
import classes from './classes';

const STYLES = {
  loginForm: {
    marginTop: 100,
  },
};

const CustomerLogin = props => (
  <div className={css(classes.page)}>
    <LoginForm
      containerStyles={STYLES.loginForm}
      {...props}
    />
    <DrvrFooter />
  </div>
);

export default CustomerLogin;
