/* internal portal root */
import configureStore from 'redux/store';
import createReducer from 'redux/reducers';
import { renderProject } from 'projects/baseProject';
import createRoutes from './routes';

renderProject({
  createReducer,
  configureStore,
  anchor: document.getElementById('app'),
  createRoutes,
});
