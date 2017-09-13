import mainMenu from 'configs/mainMenu';
import { isAlerts } from 'configs';
import createOperationalScreen from 'screens/Operational/route';
import createReportsScreen from 'screens/ReportsScreen/route';
import createExecReportsScreen from 'screens/ExecReports/route';
import createVehiclesManagerScreen from 'screens/VehiclesManagerScreen/route';
import createLoginScreen from 'screens/LoginScreen/route';
import createDashboardScreen from 'screens/Dashboard/route';
import createChronicleScreen from 'screens/Chronicle/route';
import createProfileScreen from 'screens/Profile/route';
import createAlersEditorScreen from 'screens/AlertsEditor/route';
import createNotFoundScreen from 'screens/NotFound/route';
import createUsersManagerScreen from 'screens/UsersManager/route';
import createAlertLogsScreen from 'screens/AlertsLog/route';

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
  options: mainMenu.sunshine.review,
}, {
  create: createOperationalScreen,
  options: mainMenu.sunshine.operational,
}, {
  create: createChronicleScreen,
  options: mainMenu.sunshine.history,
}, {
  create: createReportsScreen,
  options: mainMenu.sunshine.reports,
}, {
  create: createExecReportsScreen,
  options: mainMenu.sunshine.execReport,
}, {
  create: createVehiclesManagerScreen,
  options: mainMenu.sunshine.vehicles,
}, {
  create: createAlertLogsScreen,
  options: mainMenu.sunshine.alertsLogs,
}, {
  create: createAlersEditorScreen,
  options: mainMenu.sunshine.alerts,
  rule: () => isAlerts, // TODO: remove rule when removing isAlert dev flag
}, {
  create: createUsersManagerScreen,
  options: mainMenu.sunshine.users,
}, {
  create: createProfileScreen,
  options: mainMenu.sunshine.profile,
}];
