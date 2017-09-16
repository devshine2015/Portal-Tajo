/* customer portal root */
import renderProject from 'projects/baseProject';
import mainMenu from 'configs/mainMenu';
import Dashboard from 'screens/Dashboard';
import screens from './screensConfig';
import createReducer from './reducers';

function bootstrapProject(/* dispatch */) {
  console.log('Now you can do project-specific stuff');
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
