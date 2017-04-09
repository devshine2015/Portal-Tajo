import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  date: 'date',
  name: 'vehicle name',
  license: 'license plate',
  mileage: 'driving distance (km.)',
  minTemp: 'min. temperature',
  maxTemp: 'max. temperature',
  avgTemp: 'avg. temperature',
  odometer: 'odometer',
  'vehicle-position': 'Position',
  'vehicle-fuel': 'Fuel (coming soon)',
  moving: 'Start/Stop Moving',
  ignition: 'Ignition On/Off',
  'vehicle-1wire-temperature': 'Temperature',
  geofences: 'Geofence crossing (coming soon)',
  mwaJobs: 'Nr of jobs',
};

export const phrasesShape = shape({
  date: string.isRequired,
  name: string.isRequired,
  license: string.isRequired,
  mileage: string.isRequired,
  minTemp: string.isRequired,
  maxTemp: string.isRequired,
  avgTemp: string.isRequired,
  odometer: string.isRequired,
  'vehicle-position': string.isRequired,
  'vehicle-fuel': string.isRequired,
  moving: string.isRequired,
  ignition: string.isRequired,
  'vehicle-1wire-temperature': string.isRequired,
  geofences: string.isRequired,
});

export default phrases;
