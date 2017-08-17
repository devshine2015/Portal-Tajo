import React from 'react';
import { css } from 'aphrodite/no-important';
import LoginForm from './components/LoginForm';
import classes from './classes';

const LoginPage = props => (
  <div className={css(classes.page)}>
    <LoginForm {...props} />
  </div>
);

export default LoginPage;
