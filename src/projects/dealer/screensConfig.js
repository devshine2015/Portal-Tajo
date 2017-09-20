import createNotFoundScreen from 'screens/NotFound/route';
import createLoginScreen from 'screens/LoginScreen/route';
import createDashboardScreen from 'screens/Dashboard/route';
import createVehiclesScreen from 'screens/VehiclesDealer/route';
import createDriverPerfScreen from 'screens/DriverPerformance/route';
import createUsersManagerScreen from 'screens/UsersManager/route';
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
  create: createDashboardScreen,
  options: menu.dashboard,
}, {
  create: createVehiclesScreen,
  options: menu.vehicles,
}, {
  create: createDriverPerfScreen,
  options: menu.drivers,
}, {
  create: createUsersManagerScreen,
  options: menu.users,
}];
