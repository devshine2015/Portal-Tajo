import React from 'react';
import { css } from 'aphrodite/no-important';
import RunningLogo from './RunningLogo';

import classes from './classes';

const AnimatedLoadingLogo = ({
  loadingText,
  radius,
  logoColor,
  textColor,
  showText,
  fullscreen,
}) => (
  <div className={css(classes.logo, fullscreen && classes.logo_fullscreen)}>
    <RunningLogo radius={radius} color={logoColor} />

    { showText && (
      <span
        className={css(classes.text)}
        style={{ color: textColor }}
      >
        { loadingText }
      </span>
    )}
  </div>
);

AnimatedLoadingLogo.propTypes = {
  showText: React.PropTypes.bool,
  loadingText: React.PropTypes.string,
  radius: React.PropTypes.number,
  logoColor: React.PropTypes.string,
  textColor: React.PropTypes.string,
  fullscreen: React.PropTypes.bool,
};

AnimatedLoadingLogo.defaultProps = {
  loadingText: 'loading...',
  radius: 10,
  logoColor: '#009688',
  textColor: '#009688',
  showText: true,
  fullscreen: false,
};

const FullscreenAnimatedLoadingLogo = (props) => (
  <AnimatedLoadingLogo
    fullscreen
    radius={30}
    showText={false}
    logoColor="#e1e1e1"
    {...props}
  />
);

const AnimatedLogo = {
  LoadingLogo: AnimatedLoadingLogo,
  FullscreenLogo: FullscreenAnimatedLoadingLogo,
};

export default AnimatedLogo;
