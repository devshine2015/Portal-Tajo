const createRoute = ({
  path,
  name,
  niceName,
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
});

export default createRoute;
