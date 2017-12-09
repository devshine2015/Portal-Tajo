import { project } from 'configs';

const createRoute = options => ({
  name: 'login',
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      if (project === 'dealer') {
        cb(null, require('./index').DealerLogin);
      } else if (project === 'scc') {
        cb(null, require('./index').SccLogin);
      } else {
        cb(null, require('./index').default);
      }
    }, 'login');
  },
  ...options,
});

export default createRoute;
