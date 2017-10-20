import React from 'react';

//
//
import PropTypes from 'prop-types';

import { theme } from 'configs';
import pure from 'recompose/pure';

import { css } from 'aphrodite/no-important';
import classes from './classes';

// import classes from './classes';

const LightIndicator = ({
  title,
  status,
  style,
}) => {
  // const className = cs(css(classes.progBarBody));
  const lightStyle = status > 0 ? { backgroundColor: theme.palette.alertColor } : {};
  return (
    <div className={css(classes.lightContainer)} style={style}>
      <div className={css(classes.lightBody)} style={lightStyle} />
      <div>
        {title}
      </div>
    </div>
  );
};

LightIndicator.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default pure(LightIndicator);
