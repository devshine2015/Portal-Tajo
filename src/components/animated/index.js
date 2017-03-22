import React from 'react';
import { css } from 'aphrodite/no-important';
import RunningLogo from './RunningLogo';

import classes from './classes';

const AnimatedLoadingLogo = ({
  loadingText,
  radius,
  logoColor,
  textColor,
}) => (
  <div className={css(classes.logo)}>
    <RunningLogo radius={radius} color={logoColor} />
    <span
      className={css(classes.text)}
      style={{ color: textColor }}
    >
      { loadingText }
    </span>
  </div>
);

AnimatedLoadingLogo.propTypes = {
  loadingText: React.PropTypes.string,
  radius: React.PropTypes.number,
  logoColor: React.PropTypes.string,
  textColor: React.PropTypes.string,
};

AnimatedLoadingLogo.defaultProps = {
  loadingText: 'loading...',
  radius: 10,
  logoColor: '#009688',
  textColor: '#009688',
};

export default AnimatedLoadingLogo;
