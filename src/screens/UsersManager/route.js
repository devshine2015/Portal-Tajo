import { auth } from 'utils/auth';

const createRoute = ({
  path,
  name,
  niceName,
}) => ({
  path,
  name,
  niceName,
  getComponent: (location, cb) => {
    if (auth.authorizeWithPerms('view:users_manager')) {
      require.ensure([], require => {
        cb(null, require('./index').default);
      }, 'usersManager');
    } else {
      cb('NotFound');
    }
  },
  protected: true,
});

export default createRoute;
