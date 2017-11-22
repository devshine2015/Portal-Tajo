import createNotFoundScreen from 'screens/NotFound/route';
import createLoginScreen from 'screens/LoginScreen/route';
import createDealerDashboardScreen from 'screens/DealerDashboard/route';
import createFuelUsageScreen from 'screens/FuelUsage/route';
import createDriveComaprisonScreen from 'screens/DriveComparison/route';
import createUsersManagerScreen from 'screens/UsersManager/route';
import createAlersEditorScreen from 'screens/AlertsEditor/route';
import createMaintenanceScreen from 'screens/Maintenance/route';
import createVehiclesManagerScreen from 'screens/VehiclesManagerScreen/route';
import createInstallerScreen from 'screens/InstallerScreen/route';
import createDevicesManagerScreen from 'screens/DevicesManager/route';
import createFleetManagerScreen from 'screens/FleetManager/route';

import menu from './menu';

export default [{
  create: createLoginScreen,
  options: {
    path: 'login',
  },
}, {
  create: createNotFoundScreen,
  options: {
    path: 'not-found',
  },
}, {
  create: createDealerDashboardScreen,
  options: menu.dashboard,
}, {
  create: createMaintenanceScreen,
  options: menu.maintenance,
}, {
  create: createFuelUsageScreen,
  options: menu.fuelUsage,
}, {
  create: createDriveComaprisonScreen,
  options: menu.driveComparison,
}, {
  create: createVehiclesManagerScreen,
  options: menu.vehicles,
}, {
  create: createDevicesManagerScreen,
  options: menu.devices,
}, {
  create: createInstallerScreen,
  options: menu.installer,
}, {
  create: createAlersEditorScreen,
  options: menu.alerts,
}, {
  create: createUsersManagerScreen,
  options: menu.users,
}, {
  create: createFleetManagerScreen,
  options: menu.fleetManager,
}];
