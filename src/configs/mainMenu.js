import roles from 'configs/roles';

const common = {
  reports: {
    name: 'reports',
    path: 'reports',
  },
  vehicles: {
    name: 'vehicles_editor',
    path: 'vehicles',
  },
  users: {
    name: 'users',
    path: 'users',
    includeRoles: [
      roles.uber, roles.admin,
    ],
  },
  operational: {
    name: 'operational',
    path: 'map',
  },
  settings: {
    name: 'settings',
    path: 'settings',
  },
  alerts: {
    name: 'alerts',
    niceName: 'Alerts Editor',
    path: 'alerts',
  },
};

const escapePortal = {
  dashboard: {
    name: 'dashboard',
    path: '',
  },
  installer: {
    name: 'installer',
    path: 'installer',
  },
  promos: {
    name: 'promos',
    path: 'promos',
  },
  devices: {
    name: 'devices',
    path: 'devices',
  },
};

const sunshinePortal = {
  review: {
    name: 'review',
    path: 'review',
  },
  history: {
    name: 'history',
    path: 'history',
  },
};

export default {
  escape: Object.assign({}, common, escapePortal),
  sunshine: Object.assign({}, common, sunshinePortal),
};
