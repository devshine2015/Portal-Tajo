import qs from 'query-string';

const endpoints = {
  // authentication
  login: {
    url: 'login',
    method: 'post',
  },
  logout: {
    url: 'login',
    method: 'delete',
  },
  // locations
  getGFs: {
    url: 'location',
    method: 'get',
  },
  createGF: {
    url: 'location',
    method: 'post',
  },
  deleteGF: id => ({
    url: `location/${id}`,
    method: 'delete',
  }),
  // vehicles
  createVehicle: {
    url: 'vehicles',
    method: 'post',
  },
  getVehicles: {
    url: 'vehicles',
    method: 'get',
  },
  getVehicle: id => ({
    url: `vehicles/${id}`,
    method: 'get',
  }),
  updateVehicle: id => ({
    url: `vehicles/${id}`,
    method: 'put',
  }),
  attachDevice: id => ({
    url: `vehicles/${id}/device`,
    method: 'post',
  }),
  // stats
  getStats: {
    url: 'status',
    method: 'get',
  },
  // devices
  createDevice: {
    url: 'devices',
    method: 'post',
  },
  // reports
  idlingReport: {
    url: 'report/idling',
    method: 'get',
  },
  mileageReport: {
    url: 'report/mileage',
    method: 'get',
  },
  temperatureReport: {
    url: 'report/temperature',
    method: 'get',
  },

  // events
  getEventsInTimeRange: (id, params) => ({
    url: `vehicles/${id}/events?${qs.stringify(params)}`,
    method: 'get',
  }),

  // ws monitor
  monitor: {
    url: 'status/monitor',
  },
};

export default {
  ...endpoints,
};
