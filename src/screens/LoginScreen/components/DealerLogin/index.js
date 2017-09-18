import React from 'react';
import { css } from 'aphrodite/no-important';
import LoginForm from '../LoginForm';
import Logos from './Logos';
import classes from './classes';

const CustomerLogin = props => (
  <div className={css(classes.page)}>
    <div className={css(classes.fakeBar)} />
    <div className={css(classes.page__inn)}>
      <div
        className={css(classes.page__content)}
        style={{
          width: LoginForm.defaultWidth,
        }}
      >
        <Logos />
        <LoginForm {...props} />
      </div>
    </div>
  </div>
);

export default CustomerLogin;
