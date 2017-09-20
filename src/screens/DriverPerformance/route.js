const createRoute = ({
  loadModule,
  // injectReducer,
  errorHandler,
  ...options
}) => ({
  ...options,
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      const importModules = Promise.all([
        // require('containers/VehiclesEditor/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([/* reducer,  */component]) => {
        // injectReducer('vehicleEditor', reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'driverPerformance');
  },
});

export default createRoute;
