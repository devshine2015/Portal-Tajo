const createRoute = ({ path, name = 'root' }) => ({
  path,
  name,
  component: require('./index').default,
  childRoutes: [],
});

module.exports = createRoute;
