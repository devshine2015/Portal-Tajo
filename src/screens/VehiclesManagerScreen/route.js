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
        require('services/Devices/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([reducer, devices, component]) => {
        injectReducer(NAME, reducer.default);
        injectReducer('devices', devices.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'vehicleEditor');
  },
  protected: true,
});

module.exports = createRoute;
