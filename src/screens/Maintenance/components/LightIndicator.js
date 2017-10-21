import React from 'react';

//
//
import PropTypes from 'prop-types';

// import { theme } from 'configs';
import pure from 'recompose/pure';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import classes from './classes';

// import classes from './classes';

const LightIndicator = ({
  title,
  status,
  style,
}) => {
  // const lightStyle = status > 0 ? { backgroundColor: theme.palette.alertColor } : {};
  const lightBodyClass = cs(css(classes.lightBody), {
    [css(classes.animatedAlertColor)]: status > 0 });
  return (
    <div className={css(classes.lightContainer)} style={style}>
      <div className={lightBodyClass} />
      <div className={css(classes.titleContainer)}>
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
