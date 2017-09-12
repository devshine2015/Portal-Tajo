/* dealer portal root */
import renderProject from 'projects/baseProject';
import createRoutes from './routes';
import createReducer from './reducers';

renderProject({
  createReducer,
  createRoutes,
});
