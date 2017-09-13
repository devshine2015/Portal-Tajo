import mainMenu from 'configs/mainMenu';
import { ROOT_ROUTE } from 'configs';
import createRootScreen from 'screens/Root/route';
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
  options: mainMenu.sunshine.review,
}];

export const createRootRoute = screenCreator => screenCreator({
  create: createRootScreen,
  options: {
    path: ROOT_ROUTE,
    mainMenu: mainMenu.sunshine,
  },
});
