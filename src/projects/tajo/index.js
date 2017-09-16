/* internal portal root */
import renderProject from 'projects/baseProject';
import mainMenu from 'configs/mainMenu';
import { commonFleetActions } from 'services/FleetModel/actions';
import Dashboard from 'screens/Dashboard';
import screens from './screensConfig';
import createReducer from './reducers';

function bootstrapProject(dispatch) {
  dispatch(commonFleetActions.fetchFleet());
}

renderProject({
  bootstrapProject,
  createReducer,
  routesConfig: {
    screens,
    initialScreenConfig: {
      component: Dashboard,
      protected: true,
    },
    menu: mainMenu.escape,
  },
});
