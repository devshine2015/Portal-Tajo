const createRoute = ({
  path,
  name,
  niceName,
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
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([
        installerReducer,
        installerScreenComponent,
      ]) => {
        injectReducer(name, installerReducer.default);
        renderModule(installerScreenComponent);
      });

      importModules.catch(errorHandler);
    }, 'installer');
  },
  protected: true,
});

module.exports = createRoute;
