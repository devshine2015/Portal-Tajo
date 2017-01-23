import roles from 'configs/roles';

const common = {
  reports: {
    name: 'reports',
    niceName: 'Reports',
    path: 'reports',
  },
  vehicles: {
    name: 'vehicles',
    niceName: 'Vehicles Editor',
    path: 'vehicles',
  },
  users: {
    name: 'users',
    niceName: 'Users Manager',
    path: 'users',
    includeRoles: [
      roles.uber, roles.admin,
    ],
  },
  operational: {
    name: 'operational',
    niceName: 'Operational',
    path: 'map',
  },
};

const escapePortal = {
  dashboard: {
    name: 'dashboard',
    niceName: 'Dashboard',
    path: '',
  },
  installer: {
    name: 'installer',
    niceName: 'Installer',
    path: 'installer',
  },
  promos: {
    name: 'promos',
    niceName: 'Promo',
    path: 'promos',
  },
  devices: {
    name: 'devices',
    niceName: 'Devices Manager',
    path: 'devices',
  },
};

const sunshinePortal = {
  review: {
    name: 'review',
    niceName: 'Review',
    path: 'review',
  },
  history: {
    name: 'history',
    niceName: 'History',
    path: 'history',
  },
};

export default {
  escape: Object.assign({}, common, escapePortal),
  sunshine: Object.assign({}, common, sunshinePortal),
};
