import createLoginScreen from 'screens/LoginScreen/route';
import createOperationalScreen from 'screens/Operational/route';
import createChronicleScreen from 'screens/Chronicle/route';
import createOverviewScreen from 'screens/DemoDealerDashboard/route';
import createNotFoundScreen from 'screens/NotFound/route';

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
  create: createOperationalScreen,
  options: menu.operational,
}, {
  create: createChronicleScreen,
  options: menu.history,
}, {
  create: createOverviewScreen,
  options: menu.overview,
}];
