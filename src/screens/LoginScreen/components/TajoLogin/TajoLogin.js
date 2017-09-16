import React from 'react';
import { css } from 'aphrodite/no-important';
import LoginForm from '../LoginForm';
import classes from './classes';

const CustomerLogin = props => (
  <div className={css(classes.page)}>
    <LoginForm {...props} />
  </div>
);

export default CustomerLogin;
