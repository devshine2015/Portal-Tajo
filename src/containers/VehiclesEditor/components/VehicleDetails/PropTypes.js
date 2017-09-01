import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;
const number = PropTypes.number;
const oneOfType = PropTypes.oneOfType;

const phrases = [
  'vehicle_name',
  'license_plate',
  'imei',
  'manufacturer',
  'odo_in_miles',
  'model_name',
  'year',
  'odometer_value',
  'vehicle_kind_hint',
  'save',
  'cancel',
  'disable',
  'parameters',
  'reset',
];

export const detailsShape = shape({
  id: string.isRequired,
  deviceId: string,
  kind: string,
  name: string.isRequired,
  make: string.isRequired,
  model: string.isRequired,
  year: string.isRequired,
  licensePlate: string.isRequired,
  odometer: oneOfType([
    string,
    number,
  ]).isRequired,
  marker: string.isRequired,
  driverId: string.isRequired,
});

export default phrases;
