import qs from 'query-string';

const apis = {
  auth0Api: 'auth0Api',
  managmentAPI: 'managmentAPI',
  authorizationExtAPI: 'authorizationExtAPI',
};

const endpoints = {
  // authentication
  login: params => ({
    url: params === undefined ? 'login' : `login?${qs.stringify(params)}`,
    method: 'post',
    apiVersion: 1.1,
  }),
  logout: accessToken => ({
    url: `logout/${accessToken}`,
    method: 'get',
    apiVersion: 1.1,
  }),
  extraLogin: {
    url: 'login/auth0',
    method: 'post',
    apiVersion: 1.1,
  },

  // profile
  getUserInfo: {
    url: 'tokeninfo',
    method: 'post',
    extName: apis.auth0Api,
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

  // reports fleet level
  getFleetOverview: params => ({
    url: `reports/overview?${qs.stringify(params)}`,
    method: 'get',
  }),
  getFleetFuel: params => ({
    url: `reports/fuel?${qs.stringify(params)}`,
    method: 'get',
  }),

  // reports vehicle level
  getVehicleFuelReport: (id, params) => ({
    url: `vehicles/${id}/report/fuel/?${qs.stringify(params)}`,
    method: 'get',
  }),

  // users managment
  getUsers: params => ({
    url: `users?${qs.stringify(params)}`,
    method: 'get',
    extName: apis.managmentAPI,
  }),
  updateUser: id => ({
    url: `users/${id}`,
    method: 'patch',
    extName: apis.managmentAPI,
  }),
  createUser: {
    url: 'users',
    method: 'post',
    extName: apis.managmentAPI,
  },
  deleteUser: id => ({
    url: `users/${id}`,
    method: 'delete',
    extName: apis.managmentAPI,
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
    extName: apis.authorizationExtAPI,
  },
  getPermissionsNext: {
    url: 'auth0/permissions',
    method: 'get',
    apiVersion: 1.1,
    extName: apis.authorizationExtAPI,
  },
  getRoles: {
    url: 'auth0/roles',
    method: 'post',
    apiVersion: 1.1,
    extName: apis.authorizationExtAPI,
  },
  getRolesNext: {
    url: 'auth0/roles',
    method: 'get',
    apiVersion: 1.1,
    extName: apis.authorizationExtAPI,
  },
  assignRoleToUser: id => ({
    url: `users/${id}/roles`,
    method: 'patch',
    extName: apis.authorizationExtAPI,
  }),
  unassignRoleToUser: id => ({
    url: `users/${id}/roles`,
    method: 'delete',
    extName: apis.authorizationExtAPI,
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
  // subFleets
  createSubFleet: {
    url: 'subfleets',
    method: 'post',
  },
  getSubFleets: {
    url: 'subfleets',
    method: 'get',
  },
  // MWA
  getMWAJobs: params => ({
    url: `mwa/jobs/01?${qs.stringify(params)}`,
    urlStatic: 'mwa/jobs/01?',
    method: 'get',
    apiVersion: 1.1,
  }),
};

export default endpoints;
