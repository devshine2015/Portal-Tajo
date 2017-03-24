import { auth } from 'utils/auth';

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
    if (auth.authorize('view:users_manager')) {
      require.ensure([], require => {
        const importModules = Promise.all([
          require('services/Users/reducer'),
          require('./index'),
        ]);

        const renderModule = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('usersManager', reducer.default);
          renderModule(component);
        });

        importModules.catch(errorHandler);
      }, 'usersManager');
    } else {
      cb('NotFound');
    }
  },
  protected: true,
});

export default createRoute;
