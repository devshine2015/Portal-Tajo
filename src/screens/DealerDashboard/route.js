export default function createRoute(options) {
  return {
    ...options,
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        cb(null, require('./index').default);
      }, 'dealerDashboard');
    },
  };
}
