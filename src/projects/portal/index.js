/* customer portal root */
import renderProject from 'projects/baseProject';
import mainMenu from 'configs/mainMenu';
import { commonFleetActions } from 'services/FleetModel/actions';
import Operational from 'screens/Operational';
import screens from './screensConfig';
import createReducer from './reducers';

function bootstrapProject(dispatch) {
  dispatch(commonFleetActions.fetchFleet());
}

renderProject({
  createReducer,
  bootstrapProject,
  routesConfig: {
    screens,
    initialScreenConfig: {
      component: Operational,
      protected: true,
    },
    menu: mainMenu.sunshine,
  },
});
