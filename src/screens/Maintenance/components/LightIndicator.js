import React from 'react';
import PropTypes from 'prop-types';

// import { theme } from 'configs';
import pure from 'recompose/pure';
// import cs from 'classnames';
import { css } from 'aphrodite/no-important';
// import SvgIcon from 'material-ui/SvgIcon';
import Oil from 'assets/images/svg_icons/change_car_oil.svg';
import Brake from 'assets/images/svg_icons/info.svg';
// import Worker from 'assets/images/svg_icons/worker.svg';
import EngineTemp from 'assets/images/svg_icons/thermometer.svg';
import Engine from 'assets/images/svg_icons/motor.svg';
import Battery from 'assets/images/svg_icons/battery.svg';

import classes from './classes';

export const ENGINE_TROUBLE = 'engTrb';
export const BRAKE_WARNING = 'brkWarn';
export const ENGINE_TEMP = 'enfTemp';
export const OIL_PREASSURE = 'oilPrs';
export const BATTERY_WARNING = 'btrWarn';

function getMyLight(kind) {
  switch (kind) {
    case ENGINE_TROUBLE: return {
      icon: (<Engine className={css(classes.lightSvg)} />),
      title: 'Engine',
    };
    case BRAKE_WARNING: return {
      icon: (<Brake className={css(classes.lightSvg)} />),
      title: 'Brake',
    };
    case ENGINE_TEMP: return {
      // icon: (<EngineTemp className={css(classes.lightSvg, classes.animatedAlertFill)} />),
      icon: (<EngineTemp className={css(classes.lightSvg)} />),
      title: 'Engine Temp',
    };
    case BATTERY_WARNING: return {
      icon: (<Battery className={css(classes.lightSvg)} />),
      title: 'Battery',
    };
    default:
    case OIL_PREASSURE: return {
      icon: (<Oil className={css(classes.lightSvg)} style={{ position: 'relative', bottom: '-5px' }} />),
      title: 'Oil',
    };
  }
}

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
