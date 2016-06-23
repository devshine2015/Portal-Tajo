import { offlineDataActions } from './actions';

const createRoute = ({
  path,
  name = 'installer',
  errorHandler,
  injectReducer,
  loadModule,
  dispatch,
}) => ({
  path,
  name,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const importModules = Promise.all([
        require('./reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([
        installerReducer,
        installerScreenComponent,
      ]) => {
        injectReducer('installer', installerReducer.default);
        renderModule(installerScreenComponent);
      });

      importModules.catch(errorHandler);
    }, 'installer');
  },
  onEnter: () => {
    dispatch(offlineDataActions.checkStorage());
  },
});

module.exports = createRoute;
