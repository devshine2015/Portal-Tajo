import { pagesActions } from './actions';

const NAME = 'dashboard';

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
      });

      importModules.catch(errorHandler);
    }, 'dashboard');
  },
  onEnter: (nextLocation) => {
    // git child routes to build
    // links for MainSidebar dynamically
    let childRoutes = [];

    if (nextLocation.routes[1] && nextLocation.routes[1].path === path) {
      childRoutes = nextLocation.routes[1].childRoutes;
    }

    dispatch(pagesActions.setDashboardPages(childRoutes));
  },
  childRoutes: [],
});

module.exports = createRoute;
