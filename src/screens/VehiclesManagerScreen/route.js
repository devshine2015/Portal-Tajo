const NAME = 'vehicleEditor';

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
        require('containers/VehiclesEditor/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([reducer, component]) => {
        injectReducer(NAME, reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'vehicleEditor');
  },
});

module.exports = createRoute;
