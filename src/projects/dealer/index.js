/* customer portal root */
import DealerDashboard from 'screens/DealerDashboard';
import renderProject from '../baseProject';
import screens from './screensConfig';
import createReducer from './reducers';
import menu from './menu';

function bootstrapProject(/* dispatch */) {}

renderProject({
  bootstrapProject,
  createReducer,
  routesConfig: {
    menu,
    screens,
    initialScreenConfig: {
      component: DealerDashboard,
      protected: true,
    },
  },
});
