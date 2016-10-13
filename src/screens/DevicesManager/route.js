const NAME = 'devices';

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
  loadModule,
  injectReducer,
  errorHandler,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const importModules = Promise.all([
        require('services/Devices/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([reducer, component]) => {
        injectReducer(NAME, reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'devices');
  },
  protected: true,
});

module.exports = createRoute;
