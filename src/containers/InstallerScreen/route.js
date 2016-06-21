const createRoute = ({
  path,
  name = 'installer',
  errorHandler,
  injectReducer,
  loadModule,
}) => ({
  path,
  name,
  getComponent: (location, cb) => {
    require.ensure([
      'containers/Message/reducer',
      'containers/OfflineData/reducer',
      'containers/Notification/reducer',
    ], require => {
      const importModules = Promise.all([
        // require('containers/Message/reducer'),
        // require('containers/OfflineData/reducer'),
        // require('containers/Notification/reducer'),
        require('./reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([
        // messageReducer,
        // offlineReducer,
        // notifiationReducer,
        installerReducer,
        installerScreenComponent,
      ]) => {
        // injectReducer('message', messageReducer.default);
        // injectReducer('offlineData', offlineReducer.default);
        // injectReducer('notification', notifiationReducer.default);
        injectReducer('installer', installerReducer.default);
        renderModule(installerScreenComponent);
      });

      importModules.catch(errorHandler);
    }, 'installer');
  },
});

module.exports = createRoute;
