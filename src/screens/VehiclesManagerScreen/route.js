const createRoute = ({
  path,
  name,
  niceName,
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
        injectReducer(name, reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'vehicleEditor');
  },
  protected: true,
});

export default createRoute;
