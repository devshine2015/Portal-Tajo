import { pagesActions } from './actions';

const NAME = 'dashboard';

function getChilds(nextLocation, path) {
  let childRoutes = [];

  if (nextLocation.routes[1] && nextLocation.routes[1].path === path) {
    childRoutes = nextLocation.routes[1].childRoutes;
  }

  return childRoutes;
}

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
  errorHandler,
  injectReducer,
  loadModule,
  dispatch,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const importModules = Promise.all([
        require('./reducer'),
        require('./index'),
      ]);

      const renderModule = loadModule(cb);

      importModules.then(([
        dashboardReducer,
        dashboardComponent,
      ]) => {
        injectReducer(NAME, dashboardReducer.default);
        renderModule(dashboardComponent);

        const childRoutes = getChilds(location, path);

        dispatch(pagesActions.setDashboardPages(childRoutes));
      });

      importModules.catch(errorHandler);
    }, 'dashboard');
  },
  childRoutes: [],
});

module.exports = createRoute;
