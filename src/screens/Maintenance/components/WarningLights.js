import React from 'react';
import PropTypes from 'prop-types';

//
//
// import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import classes from './classes';
import LightIndicator, { ENGINE_TROUBLE, BRAKE_WARNING,
  ENGINE_TEMP, OIL_PREASSURE, BATTERY_WARNING } from './LightIndicator';


// import classes from './classes';
function devRndLightStatus() {
  return (Math.random() < 0.7) ? 0 : 1;
}


const WarningLights = props =>
  (
    <div className={css(classes.progContainer)} style={props.style}>
      <div className={css(classes.titleContainer)}>
        {'Warning Lights'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LightIndicator
          myKind={ENGINE_TROUBLE}
          status={devRndLightStatus()}
        />
        <LightIndicator
          myKind={ENGINE_TEMP}
          status={devRndLightStatus()}
        />
        <LightIndicator
          myKind={BRAKE_WARNING}
          status={devRndLightStatus()}
        />
        <LightIndicator
          myKind={BATTERY_WARNING}
          status={devRndLightStatus()}
        />
        <LightIndicator
          myKind={OIL_PREASSURE}
          status={devRndLightStatus()}
        />
      </div>
    </div>
  )
;

WarningLights.propTypes = {
  style: PropTypes.object.isRequired,
};

export default pure(WarningLights);
