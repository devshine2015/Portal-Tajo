import React from 'react';

//
//
import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import { css } from 'aphrodite/no-important';
import classes from './classes';

// import classes from './classes';

const ProgressBar = ({
  title,
  zeroValue,
  endValue,
  currentValue,
  style,
}) => {
  if (endValue === 0) {
    return false;
  }
  const witdhPerc = `${100 * ((currentValue - zeroValue) / (endValue - zeroValue))}%`;
  // const className = cs(css(classes.progBarBody));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  return (
    <div className={css(classes.progContainer)} style={style}>
      <div>
        {title}
      </div>
      <div className={css(classes.progBarBody)} >
        <div className={css(classes.progBarProg)} style={{ width: witdhPerc }} />
        {/* // <span >
      //     Trip from:
      // </span>
      // <span style={{ paddingLeft: 8, paddingRight: 8, fontWeight: 'bolder' }}>
      //   {aTripData.startDate.toLocaleTimeString()}
      // </span> */}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  zeroValue: PropTypes.number.isRequired,
  endValue: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired,
  style: PropTypes.object,
};

// by default the range is 0-100 (percentage value)
ProgressBar.defaultProps = {
  zeroValue: 0,
  endValue: 100,
};

export default pure(ProgressBar);
