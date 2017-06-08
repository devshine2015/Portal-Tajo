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
  alerts: {
    name: 'alerts_editor',
    path: 'alerts',
  },
  execReport: {
    name: 'exec_report',
    path: 'execreport',
  },
  profile: {
    name: 'profile',
    path: 'profile',
  },
  alertsLogs: {
    name: 'alerts_logs',
    path: 'alertslogs',
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
    name: 'devices_manager',
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
  common,
};
