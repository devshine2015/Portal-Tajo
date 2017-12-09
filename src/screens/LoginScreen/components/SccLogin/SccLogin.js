import React from 'react';
import { css } from 'aphrodite/no-important';
import LoginForm from '../LoginForm';
import DrvrFooter from '../DrvrFooter';
import Logos from './Logos';
import classes from './classes';

const STYLES = {
  content: {
    width: LoginForm.defaultWidth,
  },
  formWrapper: {
    marginTop: 10,
  },
  formError: {
    color: 'red',
  },
};

const SccLogin = props => (
  <div className={css(classes.page)}>
    <div className={css(classes.fakeBar)} />
    <div className={css(classes.page__inn)}>
      <div
        className={css(classes.page__content)}
        style={STYLES.content}
      >
        <Logos />
        <LoginForm
          containerStyles={STYLES.formWrapper}
          errorStyles={STYLES.formError}
          {...props}
        />
      </div>
    </div>
    <DrvrFooter />
  </div>
);

export default SccLogin;
