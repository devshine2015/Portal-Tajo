const createRoute = options => ({
  ...options,
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'usersManager');
  },
});

export default createRoute;
