import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';

// import ItemProperty from './../DetailItemProperty';
import { msToTimeIntervalString, metersToKmString,
  speedToString, temperatureToString } from 'utils/convertors';

// import DateIcon from 'material-ui/svg-icons/action/date-range';
import TimeIcon from 'material-ui/svg-icons/device/access-time';
import SpeedIcon from 'material-ui/svg-icons/maps/directions-run';
// import SpeedIcon from 'material-ui/svg-icons/notification/network-check';
import DistanceIcon from 'material-ui/svg-icons/action/timeline';


import classes from './classes';

const STYLES = {
  icon: {
    width: 24,
    height: 24,
  },
};

const DetailItemProperty = ({
  title,
  icon,
  value,
}) => (
  <div className={css(classes.propContainer)}>
    <span className={css(classes.titleCell)}>
      {title === '' ? icon : `${title}:`}
    </span>
    <span className={css(classes.valueCell)}>
      {value}
    </span>
  </div>
);

DetailItemProperty.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
DetailItemProperty.defaultProps = {
  icon: null,
  title: '',
};

const Trip = ({
  aTripData,
}) => (
  <div className={css(classes.trip_container)}>
    {/* <span className={css(classes.trip_arrow)}>&#8595;</span>*/}
    {/* <span className={css(classes.trip_arrow)}>&#8681;</span>*/}
    {/* title={'Trip Duration'}*/}

    <DetailItemProperty
      icon={<TimeIcon style={STYLES.icon} />}
      value={msToTimeIntervalString(aTripData.durationTotalMs)}
    />
    <DetailItemProperty
      icon={<DistanceIcon style={STYLES.icon} />}
      value={metersToKmString(aTripData.calculatedDistanceM)}
    />
    <DetailItemProperty
      icon={<SpeedIcon style={STYLES.icon} />}
      value={speedToString(aTripData.maxSpeed)}
    />
    { aTripData.hasTemperature() && 
      <div>
        <DetailItemProperty
          title={'maxT'}
          value={temperatureToString(aTripData.maxTemp)}
        />
        <DetailItemProperty
          title={'minT'}
          value={temperatureToString(aTripData.minTemp)}
        />
      </div>}

    {/* <table style={{ width: 200 }}>
        <ItemProperty
          title={'Trip Duration'}
          value={msToTimeIntervalString(aTripData.durationMs)}
        />
        <ItemProperty
          title={'Trip Distance'}
          value={metersToKmString(aTripData.calculatedDistanceM)}
        />
        <ItemProperty
          title={'Max Speed'}
          value={speedToString(aTripData.maxSpeed)}
        />
      </table>*/}
    <div className={css(classes.trip_arrow)} />
  </div>
);

/* <ItemProperty
  title={'Samples all/pos'}
  value={`${aTripData.numberOfSamples}/${aTripData.numberOfPosSamples}`}
/>*/


Trip.propTypes = {
  aTripData: PropTypes.object.isRequired,
};

export default pure(Trip);
