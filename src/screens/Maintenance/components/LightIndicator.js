import React from 'react';
import PropTypes from 'prop-types';

// import { theme } from 'configs';
import pure from 'recompose/pure';
// import cs from 'classnames';
import { css } from 'aphrodite/no-important';
// import SvgIcon from 'material-ui/SvgIcon';
import Oil from 'assets/images/svg_icons/oil.svg';
import Brake from 'assets/images/svg_icons/brake.svg';
import Worker from 'assets/images/svg_icons/worker.svg';
import Engine from 'assets/images/svg_icons/engine.svg';

import classes from './classes';

export const ENGINE_TROUBLE = 'engTrb';
export const BRAKE_WARNING = 'brkWarn';
export const ENGINE_TEMP = 'enfTemp';
export const OIL_PREASSURE = 'oilPrs';

function getMyLight(kind) {
  switch (kind) {
    case ENGINE_TROUBLE: return {
      icon: (<Engine className={css(classes.lightSvg)} />),
      title: 'Engine Trouble',
    };
    case BRAKE_WARNING: return {
      icon: (<Brake className={css(classes.lightSvg, classes.animatedAlertFill)} />),
      title: 'Brake Warning',
    };
    case ENGINE_TEMP: return {
      icon: (<Worker className={css(classes.lightSvg)} />),
      title: 'Engine Temp',
    };
    default:
    case OIL_PREASSURE: return {
      icon: (<Oil className={css(classes.lightSvg)} />),
      title: 'Oil Pressure',
    };
  }
};

const LightIndicator = ({
  myKind,
  // status,
}) => {
  // const lightStyle = status > 0 ? { backgroundColor: theme.palette.alertColor } : {};
  const myLight = getMyLight(myKind);

  return (
    <div className={css(classes.lightContainer)}>
      <div style={{ width: '48px', height: '48px' }}>
        {myLight.icon}
      </div>
      <div className={css(classes.titleContainer, classes.lightTitle)}>
        {myLight.title}
      </div>
    </div>
  );
};

LightIndicator.propTypes = {
  myKind: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
};

export default pure(LightIndicator);
