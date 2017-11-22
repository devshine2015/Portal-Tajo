const createRoute = options => ({
  ...options,
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'driverPerformance');
  },
});

export default createRoute;
