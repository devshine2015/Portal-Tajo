const createRoute = ({
  childRoutes,
  auth,
}) => ({
  childRoutes,
  auth,
  name: 'login',
  path: '/login',
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'login');
  },
  protected: false,
});

export default createRoute;
