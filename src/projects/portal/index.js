/* customer portal root */
import renderProject from 'projects/baseProject';
import { commonFleetActions } from 'services/FleetModel/actions';
import Operational from 'screens/Operational';
import screens from './screensConfig';
import createReducer from './reducers';
import menu from './menu';

function bootstrapProject(dispatch) {
  dispatch(commonFleetActions.fetchFleet());
}

renderProject({
  createReducer,
  bootstrapProject,
  routesConfig: {
    menu,
    screens,
    initialScreenConfig: {
      component: Operational,
      protected: true,
    },
  },
});
