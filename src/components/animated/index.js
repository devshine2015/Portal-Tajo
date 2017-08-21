import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import RunningLogo from './RunningLogo';

import classes from './classes';

const AnimatedLoadingLogo = ({
  loadingText,
  radius,
  logoColor,
  textColor,
  showText,
  containerClassName,
  containerStyle,
}) => (
  <div
    className={css(classes.logo, containerClassName)}
    style={containerStyle}
  >
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
  showText: PropTypes.bool,
  loadingText: PropTypes.string,
  radius: PropTypes.number,
  logoColor: PropTypes.string,
  textColor: PropTypes.string,
  containerClassName: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  containerStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

AnimatedLoadingLogo.defaultProps = {
  containerClassName: undefined, // aphrodite class name
  containerStyle: {},
  loadingText: 'loading...',
  radius: 10,
  logoColor: '#009688',
  textColor: '#009688',
  showText: true,
};

const FullscreenAnimatedLoadingLogo = props => (
  <AnimatedLoadingLogo
    containerClassName={classes.logo_fullscreen}
    radius={30}
    showText={false}
    logoColor="#e1e1e1"
    {...props}
  />
);

const AnimatedLogo = ({
  containerColor,
  ...rest
}) => (
  <AnimatedLoadingLogo
    containerClassName={classes.logo_centered}
    containerStyle={{
      backgroundColor: containerColor,
    }}
    radius={30}
    showText={false}
    logoColor="#e1e1e1"
    {...rest}
  />
);

AnimatedLogo.propTypes = {
  containerColor: PropTypes.string,
};
AnimatedLogo.defaultProps = {
  containerColor: '#fff',
};

export default {
  AnimatedLogo: AnimatedLogo,
  LoadingLogo: AnimatedLoadingLogo,
  FullscreenLogo: FullscreenAnimatedLoadingLogo,
};
