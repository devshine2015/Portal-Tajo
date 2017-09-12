/* customers portal root */
import createReducer from 'redux/reducers';
import renderProject from 'projects/baseProject';
import createRoutes from './routes';

renderProject({
  createReducer,
  createRoutes,
});
