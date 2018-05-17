import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

const COLORS = {
  green: '#00c51a',
  yellow: '#ffe201',
  red: '#f50000',
};
const STYLES = {
  indicator: {
    position: 'absolute',
    border: 'solid 1px rgba(255, 255, 255, 0.75)',
    borderRadius: '50%',
    width: 17,
    height: 17,
    right: 14,
    top: '50%',
    marginTop: -8,
  },
};

const jobsCount = R.compose(R.length, R.pathOr(R.always([]), ['mwa', 'jobs']));

const getJobColor = (vehicle = {}) => {
  const count = jobsCount(vehicle);
  let result;

  if (count >= 7) result = COLORS.red;
  else if (count >= 4) result = COLORS.yellow;
  else result = COLORS.green;

  return result;
};

const MWAVehicleDetails = ({
  vehicle,
}) => {
  const mwaIdicator = {
    ...STYLES.indicator,
    backgroundColor: getJobColor(vehicle),
  };
  return (
    <div style={mwaIdicator} />
  );
};

MWAVehicleDetails.propTypes = {
  vehicle: PropTypes.shape({
    mwa: PropTypes.shape({
      jobs: PropTypes.array,
    }),
  }).isRequired,
};

export default pure(MWAVehicleDetails);
