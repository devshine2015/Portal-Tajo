/* customer portal root */
import renderProject from 'projects/baseProject';
import mainMenu from 'configs/mainMenu';
import Operational from 'screens/Operational';
import screens from './screensConfig';
import createReducer from './reducers';

renderProject({
  createReducer,
  routesConfig: {
    screens,
    initialScreenConfig: {
      component: Operational,
      protected: true,
    },
    menu: mainMenu.sunshine,
  },
});
