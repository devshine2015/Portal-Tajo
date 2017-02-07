const createRoute = ({
  path,
  name,
  niceName,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'alerts');
  },
  childRoutes: [],
  protected: true,
});

module.exports = createRoute;
