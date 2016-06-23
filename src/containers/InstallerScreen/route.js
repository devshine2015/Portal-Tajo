import { offlineDataActions } from './actions';

const NAME = 'installer';

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
  errorHandler,
  injectReducer,
  loadModule,
  dispatch,
}) => ({
  path,
  name,
  niceName,
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
        injectReducer(NAME, installerReducer.default);
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
