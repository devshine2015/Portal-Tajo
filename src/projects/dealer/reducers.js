/**
 * Reducers for the Dealer portal
 */

import { combineReducers } from 'redux-immutable';
import innerPortalReducer from 'containers/InnerPortal/reducer';
import sessionReducer from 'services/Session/reducer';
import globalReducer from 'services/Global/reducer';
import routerReducer from '../utils/routerReducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    session: sessionReducer,
    global: globalReducer,
    route: routerReducer,
    inner: innerPortalReducer,
    ...asyncReducers,
  });
}
