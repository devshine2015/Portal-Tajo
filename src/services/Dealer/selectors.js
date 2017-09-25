import globalizeSelectors from 'utils/globalizeSelectors';
import { reducerKey } from './reducer';

const localState = state => state.get(reducerKey);

// local selector
export const getReadyState = state => state.get('isReady');
export const getFleetReadyState = state => state.get('fleetReadyState');
export const getSubfleets = state => state.get('subfleets');

// global selectors - use it in mapStateToProps, or in action creators (getState())
export default globalizeSelectors(localState, {
  getReadyState,
  getFleetReadyState,
  getSubfleets,
});
