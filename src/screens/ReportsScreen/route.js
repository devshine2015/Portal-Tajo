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
        require('containers/Report/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([reducer, component]) => {
        injectReducer(name, reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'reports');
  },
});

export default createRoute;
