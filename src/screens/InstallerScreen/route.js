const NAME = 'installer';

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
  errorHandler,
  injectReducer,
  loadModule,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const importModules = Promise.all([
        require('containers/Installer/reducer'),
        require('services/Devices/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([
        installerReducer,
        devicesReducer,
        installerScreenComponent,
      ]) => {
        injectReducer(NAME, installerReducer.default);
        injectReducer('devices', devicesReducer.default);
        renderModule(installerScreenComponent);
      });

      importModules.catch(errorHandler);
    }, 'installer');
  },
  protected: true,
});

module.exports = createRoute;
