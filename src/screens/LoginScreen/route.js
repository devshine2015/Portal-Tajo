import { isAuth0EnabledPath } from 'configs';

const createRoute = options => ({
  name: 'login',
  getComponent: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'login');
  },
  onEnter: (nextState) => {
    // here we setting up extraneous global feature for cases like mwa and cc
    if (isAuth0EnabledPath(nextState.location)) {
      // setFeature('auth0Half', true);
      // setFeature('extraPath', options.path);
      // replace('login');
    }
  },
  ...options,
});

export default createRoute;
