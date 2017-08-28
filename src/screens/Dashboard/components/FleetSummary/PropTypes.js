import { PropTypes } from 'react';

export default PropTypes.shape({
  vehiclesAmount: PropTypes.number.isRequired,
  devicesAmount: PropTypes.number.isRequired,
  delayedAmount: PropTypes.number.isRequired,
  deadAmount: PropTypes.number.isRequired,
});
