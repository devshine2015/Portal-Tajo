const NAME = 'usersManager';

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
        require('containers/UsersManager/reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([reducer, component]) => {
        injectReducer(NAME, reducer.default);
        renderModule(component);
      });

      importModules.catch(errorHandler);
    }, 'usersManager');
  },
  protected: true,
});

module.exports = createRoute;
