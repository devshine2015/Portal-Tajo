import mainMenu from 'configs/mainMenu';
import createLoginScreen from 'screens/LoginScreen/route';
import createDashboardScreen from 'screens/Dashboard/route';
import createNotFoundScreen from 'screens/NotFound/route';

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
  create: createDashboardScreen,
  options: mainMenu.escape.review,
}];
