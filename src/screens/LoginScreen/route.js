const mwaRoute = state => /mwa/.test(state.location.pathname);

const createRoute = options => ({
  name: 'login',
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'login');
  },
  onEnter: (nextState, replace) => {
    if (mwaRoute(nextState)) replace('login');
  },
  ...options,
});

export default createRoute;
