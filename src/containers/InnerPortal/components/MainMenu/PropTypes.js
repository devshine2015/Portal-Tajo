import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  reports: 'reports',
  vehicles_editor: 'vehicles editor',
  users: 'users manager',
  operational: 'operational',
  settings: 'settings',
  dashboard: 'dashboard',
  installer: 'installer',
  promos: 'promos',
  devices: 'devices manager',
  review: 'review',
  history: 'history',
  alerts_editor: 'alerts editor',
};

export const phrasesShape = shape({
  reports: string.isRequired,
  vehicles_editor: string.isRequired,
  users: string.isRequired,
  operational: string.isRequired,
  settings: string.isRequired,
  dashboard: string.isRequired,
  installer: string.isRequired,
  promos: string.isRequired,
  devices: string.isRequired,
  review: string.isRequired,
  history: string.isRequired,
  alerts_editor: string.isRequired,
});

export default phrases;
