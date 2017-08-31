import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'reports',
  'exec_report',
  'vehicles_editor',
  'users',
  'operational',
  'profile',
  'dashboard',
  'installer',
  'promos',
  'devices_manager',
  'review',
  'history',
  'alerts_editor',
  'alerts_logs',
];

export const phrasesShape = shape({
  reports: string.isRequired,
  exec_report: string.isRequired,
  vehicles_editor: string.isRequired,
  users: string.isRequired,
  operational: string.isRequired,
  profile: string.isRequired,
  dashboard: string.isRequired,
  installer: string.isRequired,
  promos: string.isRequired,
  devices_manager: string.isRequired,
  review: string.isRequired,
  history: string.isRequired,
  alerts_editor: string.isRequired,
  alerts_logs: string.isRequired,
});

export default phrases;
