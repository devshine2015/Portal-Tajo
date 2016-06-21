const createRoute = ({
  path,
  name = 'reports',
  errorHandler,
  injectReducer,
  loadModule,
}) => ({
  path,
  name,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const importModules = Promise.all([
        require('./reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([reducer, component]) => {
        injectReducer('reports', reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'reports');
  },
});

module.exports = createRoute;
