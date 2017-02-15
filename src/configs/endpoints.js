import qs from 'query-string';

const endpoints = {
  // authentication
  login: {
    url: 'login',
    method: 'post',
    apiVersion: 1.1,
  },
  logout: {
    url: 'login',
    method: 'delete',
    apiVersion: 1.1,
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
    url: 'admin/users',
    method: 'get',
    apiVersion: 1.1,
  },
  addNewUser: {
    url: 'admin/users',
    method: 'post',
    apiVersion: 1.1,
  },

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
};

export default {
  ...endpoints,
};
