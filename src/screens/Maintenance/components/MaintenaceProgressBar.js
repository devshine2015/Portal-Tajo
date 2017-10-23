import React from 'react';

//
//
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import { theme } from 'configs';
import classes from './classes';

// import classes from './classes';

const ProgressBar = ({
  title,
  zeroValue,
  endValue,
  currentValue,
  showRestValue,
  units,
  style,
}) => {
  if (endValue === 0) {
    return false;
  }
  const realCurrent = currentValue - zeroValue;
  const restValue = endValue - currentValue;
  const currentValue100 = 100 * (realCurrent / (endValue - zeroValue));
  const isOverflow = currentValue100 >= 100;
  const witdhPerc = `${Math.min(100, currentValue100)}%`;
  // const progColor = currentValue100 > 90 ?
  //   theme.palette.alertColor
  //   : (currentValue100 > 50 ?
  //     theme.palette.warningColor : '');
  const progColor = currentValue100 > 75 ?
    theme.palette.alertColor : theme.palette.okColor;

  const barClass = cs(css(classes.progBarProg), {
    [css(classes.animatedAlertColor)]: isOverflow });
  // const className = cs(css(classes.progBarBody));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  return (
    <div className={css(classes.progContainer)} style={style}>
      <div className={css(classes.titleContainer)}>
        {title}
      </div>
      <div className={css(classes.progBarBody)} >
        <div className={barClass} style={{ width: witdhPerc, backgroundColor: progColor }}>
          {currentValue100 > 15 && (<div>
            {`${realCurrent.toFixed(0)}${units}`}
          </div>)}
        </div>
        {showRestValue && (currentValue100 < 85) && (<div className={css(classes.progBarRest)} >
          {`${restValue.toFixed(0)}${units}`}
        </div>)}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  zeroValue: PropTypes.number.isRequired,
  endValue: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired,
  showRestValue: PropTypes.bool,
  units: PropTypes.string,
  style: PropTypes.object,
};

// by default the range is 0-100 (percentage value)
ProgressBar.defaultProps = {
  zeroValue: 0,
  endValue: 100,
  showRestValue: false,
  units: '%',
};

export default pure(ProgressBar);
