const NAME = 'vehiclesEditor';

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
  loadModule,
  // injectReducer,
  errorHandler,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const importModules = Promise.all([
        // require('containers/PromoSubscribtions/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([/*reducer, */component]) => {
        // injectReducer(NAME, reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'vehiclesEditor');
  },
});

module.exports = createRoute;
