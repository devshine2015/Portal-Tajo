import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import ccLogo from 'assets/images/logos/cc/cc_logo.png';
import fusoLogo from 'assets/images/logos/cc/fuso_logo.png';
import { logoClasses } from './classes';

const Logo = ({ img, alt }) => (
  <div className={css(logoClasses.logo)}>
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
};
Logo.defaultProps = {
  alt: '',
};

const Logos = () => (
  <div className={css(logoClasses.logos)}>
    <Logo img={fusoLogo} alt="" />
    <Logo img={ccLogo} alt="cycle&carriage" />
  </div>
);

export default Logos;
