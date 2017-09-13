import mainMenu from 'configs/mainMenu';
import createDashboardScreen from 'screens/Dashboard/route';
import createNotFoundScreen from 'screens/NotFound/route';
import createLoginScreen from 'screens/LoginScreen/route';
import createInstallerScreen from 'screens/InstallerScreen/route';
import createPromoScreen from 'screens/PromoTrackingScreen/route';
import createDevicesManagerScreen from 'screens/DevicesManager/route';
import createProfileScreen from 'screens/Profile/route';
import createUsersManagerScreen from 'screens/UsersManager/route';

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
  options: mainMenu.escape.dashboard,
}, {
  create: createInstallerScreen,
  options: mainMenu.escape.installer,
}, {
  create: createPromoScreen,
  options: mainMenu.escape.promos,
}, {
  create: createDevicesManagerScreen,
  options: mainMenu.escape.devices,
}, {
  create: createUsersManagerScreen,
  options: mainMenu.escape.users,
}, {
  create: createProfileScreen,
  options: mainMenu.escape.profile,
}];
