const NAME = 'dashboard';

const createRoute = ({
  path,
  name = NAME,
  niceName = NAME,
}) => ({
  path,
  name,
  niceName,
  component: require('./index').default,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'dashboard');
  },
  childRoutes: [],
  protected: true,
});

module.exports = createRoute;
