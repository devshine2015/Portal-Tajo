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
        require('containers/DevicesManager/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([
        devicesServiceReducer,
        devicesManagerReducer,
        component,
      ]) => {
        injectReducer(NAME, devicesServiceReducer.default);
        injectReducer('devicesManager', devicesManagerReducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'devices');
  },
  protected: true,
});

module.exports = createRoute;
