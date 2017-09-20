/* customer portal root */
import Dashboard from 'screens/Dashboard';
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
      component: Dashboard,
      protected: true,
    },
  },
});
