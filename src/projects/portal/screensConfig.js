import { isAlerts } from 'configs';
import createOperationalScreen from 'screens/Operational/route';
import createReportsScreen from 'screens/ReportsScreen/route';
import createExecReportsScreen from 'screens/ExecReports/route';
import createVehiclesManagerScreen from 'screens/VehiclesManagerScreen/route';
import createLoginScreen from 'screens/LoginScreen/route';
import createDashboardScreen from 'screens/CustomerDashboard/route';
import createChronicleScreen from 'screens/Chronicle/route';
import createProfileScreen from 'screens/Profile/route';
import createAlersEditorScreen from 'screens/AlertsEditor/route';
import createNotFoundScreen from 'screens/NotFound/route';
import createUsersManagerScreen from 'screens/UsersManager/route';
import createAlertLogsScreen from 'screens/AlertsLog/route';
import createInstallerScreen from 'screens/InstallerScreen/route';
import createDevicesManagerScreen from 'screens/DevicesManager/route';

import createExpensesScreen from 'screens/Expenses/route';
import menu from './menu';

export default [{
  create: createLoginScreen,
  options: {
    path: 'login',
  },
}, {
  create: createLoginScreen,
  options: {
    path: 'mwa',
  },
}, {
  create: createNotFoundScreen,
  options: {
    path: 'not-found',
  },
}, {
  create: createDashboardScreen,
  options: menu.review,
}, {
  create: createOperationalScreen,
  options: menu.operational,
}, {
  create: createChronicleScreen,
  options: menu.history,
}, {
  create: createReportsScreen,
  options: menu.reports,
}, {
  create: createExecReportsScreen,
  options: menu.execReport,
}, {
  create: createVehiclesManagerScreen,
  options: menu.vehicles,
}, {
  create: createAlertLogsScreen,
  options: menu.alertsLogs,
}, {
  create: createAlersEditorScreen,
  options: menu.alerts,
  rule: () => isAlerts, // TODO: remove rule when removing isAlert dev flag
}, {
  create: createUsersManagerScreen,
  options: menu.users,
}, {
  create: createDevicesManagerScreen,
  options: menu.devices,
}, {
  create: createInstallerScreen,
  options: menu.installer,
}, {
  create: createProfileScreen,
  options: menu.profile,
}];
