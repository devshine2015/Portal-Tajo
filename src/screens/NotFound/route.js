const createRoute = ({
  path,
  name,
}) => ({
  path,
  name,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'notFound');
  },
});

export default createRoute;
