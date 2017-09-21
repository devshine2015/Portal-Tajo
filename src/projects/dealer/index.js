/* customer portal root */
import DealerDashboard from 'screens/DealerDashboard';
import { fetchVehicles } from 'services/DealerFleet/actions';
import renderProject from '../baseProject';
import screens from './screensConfig';
import createReducer from './reducers';
import menu from './menu';

function bootstrapProject(dispatch) {
  dispatch(fetchVehicles());
}

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
