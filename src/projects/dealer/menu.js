const menu = {
  dashboard: {
    name: 'overview',
    path: '',
    requireOneOfPermissions: ['view:dashboards'],
  },
  users: {
    name: 'users',
    path: 'users',
    requireOneOfPermissions: ['view:dashboards'],
  },
  vehicles: {
    name: 'vehicles_editor',
    path: 'vehicles',
  },
  fuelUsage: {
    name: 'fuel_usage',
    path: 'fuelusage',
    requireOneOfPermissions: ['view:dashboards'],
  },
  driveComparison: {
    name: 'drive_comparison',
    path: 'comparison',
    requireOneOfPermissions: ['view:dashboards'],
  },
  alerts: {
    name: 'alerts_editor',
    path: 'alerts',
    requireOneOfPermissions: ['view:dashboards'],
  },
  maintenance: {
    name: 'vehicle_maintenance',
    path: 'maintenance',
    requireOneOfPermissions: ['view:dashboards'],
  },
  installer: {
    name: 'installer',
    path: 'installer',
  },
  devices: {
    name: 'devices_manager',
    path: 'devices',
  },
};

export default menu;
