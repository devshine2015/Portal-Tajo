const NAME = 'dashboard';

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'dashboard');
  },
  childRoutes: [],
});

module.exports = createRoute;
