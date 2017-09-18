import React from 'react';
import { css } from 'aphrodite/no-important';
import DrvrLogo from './images/logo.svg';
import classes from './classes';

const DrvrFooter = () => {
  return (
    <div className={css(classes.footer)}>
      <div className={css(classes.footer__logo)}>
        <DrvrLogo />
      </div>
      <span className={css(classes.footer__text)}>
        Powered by Drvr
      </span>
    </div>
  );
};

export default DrvrFooter;
