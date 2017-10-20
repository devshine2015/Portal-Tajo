import React from 'react';
import { css } from 'aphrodite/no-important';
import cc from 'assets/images/logos/cc/cc_logo.png';
// import fuso from 'assets/images/logos/cc/fuso_logo.png';
// import mb from 'assets/images/logos/cc/mb_logo.png';
import classes from './Logos.classes';


const BrandLogos = () => {
  return (
    <div className={css(classes.logos)}>
      <img
        src={cc}
        className={css(classes.logos__logo)}
        alt=""
      />
      {/* <img
        src={fuso}
        className={css(classes.logos__logo)}
        alt=""
      /> */}
    </div>
  );
};

export default BrandLogos;
