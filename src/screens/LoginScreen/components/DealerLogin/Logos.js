import React from 'react';
import { css } from 'aphrodite/no-important';
import fuso from './images/fuso_logo.jpg';
import cc from './images/cc_logo.png';
import classes from './Logos.classes';

const BrandLogos = () => {
  return (
    <div className={css(classes.logos)}>
      <img src={fuso} className={css(classes.logos__logo)} alt="" />
      <img src={cc} className={css(classes.logos__logo)} alt="" />
    </div>
  );
};

export default BrandLogos;
