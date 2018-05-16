import { project } from 'configs';

const createRoute = options => ({
  name: 'login',
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      if (project === 'dealer') {
        cb(null, require('./index').DealerLogin);
      } else if (project === 'scc') {
        cb(null, require('./index').SccLogin);
      } else if (project === 'demo') {
        cb(null, require('./index').DemoLogin);
      } else if (project === 'one') {
        cb(null, require('./index').DemoLogin);
      } else {
        cb(null, require('./index').default);
      }
    }, 'login');
  },
  ...options,
});

export default createRoute;
