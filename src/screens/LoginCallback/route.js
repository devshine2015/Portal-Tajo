import {
  onSuccess,
  onFailure,
} from 'services/Session/authHelpers';
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
const createRoute = ({
  auth,
  dispatch,
}) => ({
  path: 'callback',
  onEnter: (nextState) => {
    // perform authentication with injected auth instance
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication((data) => {
        onSuccess(data, dispatch);
      }, () => {
        onFailure(dispatch);
      });
    }
  },
  component: LoginCallback,
});

export default createRoute;
