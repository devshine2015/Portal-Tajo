const createRoute = options => ({
  ...options,
  component: require('./index').default,
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'customerDashboard');
  },
  childRoutes: [],
});

export default createRoute;
