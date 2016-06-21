const createRoute = ({
  path,
  name = 'promos',
  loadModule,
  injectReducer,
  errorHandler,
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
        injectReducer('promos', reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'promos');
  },
});

module.exports = createRoute;
