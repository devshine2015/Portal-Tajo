const NAME = 'users';

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
    }, 'users');
  },
  protected: true,
});

module.exports = createRoute;
