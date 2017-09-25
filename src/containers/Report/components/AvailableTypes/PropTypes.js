import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  date: 'date',
  vehicle_name: 'vehicle name',
  license_plate: 'license plate',
  mileage: 'driving distance (km.)',
  minTemp: 'min. temperature',
  maxTemp: 'max. temperature',
  avgTemp: 'avg. temperature',
  odometer: 'odometer',
  'vehicle-position': 'Position',
  'vehicle-fuel': 'Fuel',
  moving: 'Start/Stop Moving',
  ignition: 'Ignition On/Off',
  'vehicle-1wire-temperature': 'Temperature',
  geofences: 'Geofence crossing (coming soon)',
  mwa_jobs_nbr: 'Nr of jobs',
  mwa_jobs_t: 'T of jobs',
  mwa_jobs_pipe_count: 'pipe Sz Count',
};

export const phrasesShape = shape({
  date: string.isRequired,
  vehicle_name: string.isRequired,
  license_plate: string.isRequired,
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
