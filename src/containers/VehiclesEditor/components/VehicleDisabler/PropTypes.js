import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

export const metaShape = shape({
  vehicleName: string.isRequired,
  vehicleId: string.isRequired,
  deviceId: string,
});
