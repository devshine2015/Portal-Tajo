import createLoginScreen from 'screens/LoginScreen/route';
import createOperationalScreen from 'screens/DemoOperational/route';
import createChronicleScreen from 'screens/DemoChronicle/route';
import createOverviewScreen from 'screens/DemoDealerDashboard/route';
import createNotFoundScreen from 'screens/NotFound/route';

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
  create: createOperationalScreen,
  options: menu.operational,
}, {
  create: createChronicleScreen,
  options: menu.history,
}, {
  create: createOverviewScreen,
  options: menu.overview,
}];
