/* internal portal root */
import renderProject from 'projects/baseProject';
import { commonFleetActions } from 'services/FleetModel/actions';
import Dashboard from 'screens/Dashboard';
import screens from './screensConfig';
import createReducer from './reducers';
import menu from './menu';

function bootstrapProject(dispatch) {
  dispatch(commonFleetActions.fetchFleet());
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
