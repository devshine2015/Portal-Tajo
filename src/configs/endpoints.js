import qs from 'query-string';

const endpoints = {
  // authentication
  login: {
    url: 'login',
    method: 'post',
    apiVersion: 1.1,
  },
  loginAuth0: {
    url: 'login/auth0',
    method: 'post',
    apiVersion: 1.1,
  },
  logout: {
    url: 'login',
    method: 'delete',
    apiVersion: 1.1,
  },

  // profile
  getUserInfo: {
    url: '/tokeninfo',
    method: 'post',
  },

  // locations
  getGFs: {
    url: 'location',
    method: 'get',
    apiVersion: 1,
  },
  createGF: {
    url: 'location',
    method: 'post',
    apiVersion: 1,
  },
  deleteGF: id => ({
    url: `location/${id}`,
    method: 'delete',
    apiVersion: 1,
  }),

  // vehicles
  createVehicle: {
    url: 'vehicles',
    method: 'post',
    apiVersion: 1,
  },
  getVehicles: {
    url: 'vehicles',
    method: 'get',
    apiVersion: 1,
  },
  getVehicle: id => ({
    url: `vehicles/${id}`,
    method: 'get',
    apiVersion: 1,
  }),
  updateVehicle: id => ({
    url: `vehicles/${id}`,
    method: 'put',
    apiVersion: 1,
  }),
  disableVehicle: id => ({
    url: `vehicles/${id}`,
    method: 'delete',
    apiVersion: 1,
  }),

  // stats
  getStats: {
    url: 'status',
    method: 'get',
    apiVersion: 1,
  },

  // devices
  createDevice: {
    url: 'devices',
    method: 'post',
    apiVersion: 1,
  },
  getDevices: {
    url: 'devices',
    method: 'get',
    apiVersion: 1,
  },
  deactivate: id => ({
    url: `devices/${id}`,
    method: 'delete',
    apiVersion: 1,
  }),
  attachDevice: id => ({
    url: `vehicles/${id}/device`,
    method: 'post',
    apiVersion: 1,
  }),
  detachDevice: id => ({
    url: `vehicles/${id}/device`,
    method: 'delete',
    apiVersion: 1,
  }),

  // reports
  idlingReport: {
    url: 'report/idling',
    method: 'get',
    apiVersion: 1,
  },
  mileageReport: {
    url: 'report/mileage',
    method: 'get',
    apiVersion: 1,
  },
  temperatureReport: {
    url: 'report/temperature',
    method: 'get',
    apiVersion: 1,
  },

  // users
  getAllUsers: {
    url: '/api/v2/users',
    method: 'get',
  },
  updateUser: id => ({
    url: `/api/v2/users/${id}`,
    method: 'patch',
  }),
  createUser: {
    url: '/api/v2/users',
    method: 'post',
  },
  deleteUser: id => ({
    url: `/api/v2/users/${id}`,
    method: 'delete',
  }),
  // events
  getEventsInTimeRange: (id, params) => ({
    url: `vehicles/${id}/events?${qs.stringify(params)}`,
    method: 'get',
    apiVersion: 1,
  }),

  // ws monitor
  monitor: {
    url: 'status/monitor',
  },

  // alerts system
  createAlertConditions: {
    url: 'alert-conditions',
    method: 'post',
    apiVersion: 1.120,
  },
  updateAlertConditions: (id) => ({
    url: `alert-conditions/${id}`,
    method: 'put',
    apiVersion: 1.120,
  }),
  getAlertConditions: {
    url: 'alert-conditions',
    method: 'get',
    apiVersion: 1.120,
  },
  getVehicleAlertConditions: (id) => ({
    url: `vehicles/${id}/alert-conditions`,
    method: 'get',
    apiVersion: 1.120,
  }),
  postVehicleAlertConditions: (id) => ({
    url: `vehicles/${id}/alert-conditions`,
    method: 'post',
    apiVersion: 1.120,
  }),
};

export default {
  ...endpoints,
};
