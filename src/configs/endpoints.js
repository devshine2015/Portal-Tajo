import qs from 'query-string';

const apis = {
  auth0Api: {
    name: 'auth0',
    url: 'https://drvr.auth0.com',
  },
  managmentAPI: {
    name: 'mgmtApi',
    url: 'https://drvr.auth0.com/api/v2',
  },
  authorizationExtAPI: {
    name: 'authExtApi',
    url: 'https://drvr.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api',
  },
};

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
    url: `${apis.auth0Api.url}/tokeninfo`,
    method: 'post',
  },
  getUserInfoNext: {
    url: 'auth0/userinfo',
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

  // drivers
  getDrivers: {
    url: 'drivers',
    method: 'get',
    apiVersion: 1,
  },

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

  // users managment
  getAllUsers: {
    url: `${apis.managmentAPI.url}/users`,
    method: 'get',
    extName: apis.managmentAPI.name,
  },
  updateUser: id => ({
    url: `${apis.managmentAPI.url}/users/${id}`,
    method: 'patch',
    extName: apis.managmentAPI.name,
  }),
  createUser: {
    url: `${apis.managmentAPI.url}/users`,
    method: 'post',
    extName: apis.managmentAPI.name,
  },
  deleteUser: id => ({
    url: `${apis.managmentAPI.url}/users/${id}`,
    method: 'delete',
    extName: apis.managmentAPI.name,
  }),
  getAuthExtentionAccessToken: {
    url: 'auth0/token/auth',
    method: 'get',
    apiVersion: 1.1,
  },
  getMgmtExtentionAccessToken: {
    url: 'auth0/token/mgmt',
    method: 'get',
    apiVersion: 1.1,
  },
  getPermissions: {
    url: 'auth0/permissions',
    method: 'post',
    apiVersion: 1.1,
  },
  getRoles: {
    url: 'auth0/roles',
    method: 'post',
    apiVersion: 1.1,
  },
  assignRoleToUser: id => ({
    url: `${apis.authorizationExtAPI.url}/users/${id}/roles`,
    method: 'patch',
    extName: apis.authorizationExtAPI.name,
  }),
  unassignRoleToUser: id => ({
    url: `${apis.authorizationExtAPI.url}/users/${id}/roles`,
    method: 'delete',
    extName: apis.authorizationExtAPI.name,
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
  },
  updateAlertConditions: id => ({
    url: `alert-conditions/${id}`,
    method: 'put',
  }),
  deleteAlertConditions: id => ({
    url: `alert-conditions/${id}`,
    method: 'delete',
  }),
  getAlertConditions: {
    url: 'alert-conditions',
    method: 'get',
  },
  getVehicleAlertConditions: id => ({
    url: `vehicles/${id}/alert-conditions`,
    method: 'get',
  }),
  getAlertsInTimeRange: params => ({
    url: `alerts?${qs.stringify(params)}`,
    method: 'get',
  }),
  postVehicleAlertConditions: id => ({
    url: `vehicles/${id}/alert-conditions`,
    method: 'post',
  }),
  // MWA
  getMWAJobs: (params) => ({
    url: `mwa/jobs/01?${qs.stringify(params)}`,
    urlStatic: 'mwa/jobs/01?',
    method: 'get',
    apiVersion: 1.1,
  }),
};

export default {
  ...endpoints,
};
