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
  },
};

const tajo = {
  dashboard: {
    name: 'dashboard',
    niceName: 'Dashboard',
    path: '/',
  },
  installer: {
    name: 'installer',
    niceName: 'Installer',
    path: 'installer',
  },
  promos: {
    name: 'promos',
    niceName: 'Promo Subscribtions',
    path: 'promos',
  },
  devices: {
    name: 'devices',
    niceName: 'Devices Manager',
    path: 'devices',
  },
};

const portal = {
  review: {
    name: 'review',
    niceName: 'Review',
    path: 'review',
  },
  operational: {
    name: 'operational',
    niceName: 'Operational',
    path: 'map',
  },
  history: {
    name: 'history',
    niceName: 'History',
    path: 'history',
  },
};

export default {
  tajo: Object.assign({}, common, tajo),
  portal: Object.assign({}, common, portal),
};
