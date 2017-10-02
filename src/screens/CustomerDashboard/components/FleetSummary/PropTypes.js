import PropTypes from 'prop-types';

export default PropTypes.shape({
  vehiclesAmount: PropTypes.number.isRequired,
  devicesAmount: PropTypes.number.isRequired,
  delayedAmount: PropTypes.number.isRequired,
  deadAmount: PropTypes.number.isRequired,
});

export const phrases = [
  'vehicles_amount',
  'never_reported',
  'fleet_summary_title',
  'fullscreen_mode',
];
