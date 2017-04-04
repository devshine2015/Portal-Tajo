import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'reports',
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
];

export const phrasesShape = shape({
  reports: string.isRequired,
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
});

export default phrases;
