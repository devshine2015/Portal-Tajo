const createRoute = ({ path, name = 'dashboard' }) => ({
  path,
  name,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'dashboard');
  },
  childRoutes: [],
});

module.exports = createRoute;
