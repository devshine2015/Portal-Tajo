import globalizeSelectors from 'utils/globalizeSelectors';
import { reducerKey } from './reducer';

const localState = state => state.get(reducerKey);

// local selector
export const getReadyState = state => state.get('isReady');
export const getFleetReadyState = state => state.get('fleetReadyState');
export const getSubfleets = state => state.get('subfleets');
const getSelectedTimeRange = state => state.get('selectedTimeRange');
const getSelectedSubFleet = state => state === undefined ? undefined : state.get('selectedFleet');

// global selectors - use it in mapStateToProps, or in action creators (getState())
export default globalizeSelectors(localState, {
  getReadyState,
  getFleetReadyState,
  getSubfleets,
  getSelectedSubFleet,
  getSelectedTimeRange,
});
