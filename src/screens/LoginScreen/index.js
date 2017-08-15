import React from 'react';
import { css } from 'aphrodite/no-important';
import LoginForm from './components/LoginForm2';
import classes from './classes';

const LoginPage = () => (
  <div className={css(classes.page)}>
    <LoginForm />
  </div>
);

export default LoginPage;
