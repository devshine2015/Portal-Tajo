/* customer portal root */
import DealerDashboard from 'screens/DealerDashboard';
// import InstallerScreen from 'screens/InstallerScreen';
import { fetchSubFleets } from 'services/Fleets/actions/subFleetActions';
// import { initDealerPortal } from 'services/Dealer/actions';
import renderProject from '../baseProject';
import screens from './screensConfig';
import createReducer from './reducers';
import menu from './menu';

function bootstrapProject(dispatch) {
  dispatch(fetchSubFleets());
  // .then(() => dispatch(initDealerPortal(true)));
}

renderProject({
  bootstrapProject,
  createReducer,
  routesConfig: {
    menu,
    screens,
    initialScreenConfig: {
      // component: InstallerScreen,
      component: DealerDashboard,
      protected: true,
    },
  },
});
