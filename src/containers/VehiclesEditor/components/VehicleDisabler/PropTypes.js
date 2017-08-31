import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

export const metaShape = shape({
  vehicleName: string.isRequired,
  vehicleId: string.isRequired,
  deviceId: string,
});
