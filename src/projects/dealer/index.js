/* customer portal root */
import renderProject from 'projects/baseProject';
import Dashboard from 'screens/Dashboard';
import screens from './screensConfig';
import createReducer from './reducers';
import menu from './menu';

function bootstrapProject(/* dispatch */) {
  console.log('Now you can do project-specific stuff');
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
