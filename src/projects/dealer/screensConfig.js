import createNotFoundScreen from 'screens/NotFound/route';
import createLoginScreen from 'screens/LoginScreen/route';
import createDealerDashboardScreen from 'screens/DealerDashboard/route';
import createVehiclePerformanceScreen from 'screens/VehiclesPerformance/route';
import createVehicleDiagnosticsScreen from 'screens/VehicleDiagnostics/route';
import createUsersManagerScreen from 'screens/UsersManager/route';
import createAlersEditorScreen from 'screens/AlertsEditor/route';
import createMaintenanceScreen from 'screens/Maintenance/route';


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
  create: createVehiclePerformanceScreen,
  options: menu.performance,
}, {
  create: createVehicleDiagnosticsScreen,
  options: menu.diagnostic,
}, {
  create: createUsersManagerScreen,
  options: menu.users,
}, {
  create: createAlersEditorScreen,
  options: menu.alerts,
}, {
  create: createMaintenanceScreen,
  options: menu.maintenance,
}];
