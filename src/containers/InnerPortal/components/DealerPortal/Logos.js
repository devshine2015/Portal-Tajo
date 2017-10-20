import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import ccLogo from 'assets/images/logos/cc/cc_logo.png';
// import fusoLogo from 'assets/images/logos/cc/fuso_logo.png';
// import mbLogo from 'assets/images/logos/cc/mb_logo.png';

import { logoClasses } from './classes';

const Logo = ({ img, alt, secondary }) => (
  <div className={css(secondary ? logoClasses.logo_secondary : logoClasses.logo)}>
    <img
      src={img}
      alt={alt}
      className={css(logoClasses.logo__img)}
    />
  </div>
);
Logo.propTypes = {
  img: PropTypes.node.isRequired,
  alt: PropTypes.string,
  secondary: PropTypes.bool,
};
Logo.defaultProps = {
  alt: '',
  secondary: false,
};

const Logos = () => (
  <div className={css(logoClasses.logos)}>
    <Logo img={ccLogo} alt="cycle&carriage" />
    {/* <Logo img={fusoLogo} alt="" secondary /> */}
    {/* <Logo img={mbLogo} alt="" secondary /> */}
  </div>
);

export default Logos;
