import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;
const number = PropTypes.number;
const oneOfType = PropTypes.oneOfType;

const phrases = {
  vehicle_name: 'Vehicle Name',
  license: 'License Plate Number',
  imei: 'IMEI',
  manufacturer: 'Manufacturer',
  odo_in_miles: 'ODO value in miles',
  model_name: 'Model Name',
  year: 'Year of Manufacture',
  odometer_value: 'Odometer (km.)',
  vehicle_kind_hint: 'Kind of the Vehicle',
  save: 'Save',
  cancel: 'Cancel',
  disable: 'disable',
};

export const phrasesShape = shape({
  vehicle_name: string.isRequired,
  license: string.isRequired,
  imei: string.isRequired,
  manufacturer: string.isRequired,
  odo_in_miles: string.isRequired,
  model_name: string.isRequired,
  year: string.isRequired,
  odometer_value: string.isRequired,
  save: string.isRequired,
  cancel: string.isRequired,
  vehicle_kind_hint: string.isRequired,
  disable: string.isRequired,
});

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
