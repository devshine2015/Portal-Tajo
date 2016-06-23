const createRoute = ({ path, name = 'map' }) => ({
  path,
  name,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'map');
  },
  childRoutes: [],
});

module.exports = createRoute;
