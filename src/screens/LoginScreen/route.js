const createRoute = ({ path, name = 'login' }) => ({
  path,
  name,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./index').default);
    }, 'login');
  },
  protected: false,
});

export default createRoute;
