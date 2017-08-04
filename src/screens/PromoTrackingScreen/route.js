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
        require('containers/PromoSubscribtions/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([reducer, component]) => {
        injectReducer(name, reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'promos');
  },
});

export default createRoute;
