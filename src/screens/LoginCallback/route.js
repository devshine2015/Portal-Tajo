import LoginCallback from './index';

/**
 * @description
 * Route and screen which works as a single entrypoint
 * for login callback requests.
 */

/**
 * @param {Object} options
 * @param {Auth} options.auth - instance of authentication service
 */
const createRoute = () => ({
  path: 'callback',
  onEnter: () => {
    // perform authentication with injected auth instance
  },
  component: LoginCallback,
});

export default createRoute;
