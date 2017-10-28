/* internal portal root */
import renderProject from 'projects/baseProject';
import { commonFleetActions } from 'services/FleetModel/actions';
import { fetchAllVehicleAlerts, validateAllVehiclesAlertStatus } from 'services/AlertsSystem/actions/conditionsActions';
import CustomerDashboard from 'screens/CustomerDashboard';
import screens from './screensConfig';
import createReducer from './reducers';
import menu from './menu';

function bootstrapProject(dispatch, getState) {
  dispatch(commonFleetActions.fetchFleet())
    .then(() => dispatch(fetchAllVehicleAlerts(getState)))
    .then(() => dispatch(validateAllVehiclesAlertStatus(getState)));
}

renderProject({
  bootstrapProject,
  createReducer,
  routesConfig: {
    menu,
    screens,
    initialScreenConfig: {
      component: CustomerDashboard,
      protected: true,
    },
  },
});
