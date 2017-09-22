import globalizeSelectors from 'utils/globalizeSelectors';
import { reducerKey } from './reducer';

const localState = state => state.get(reducerKey);

// local selector
export const getReadyState = state => state.get('isReady');

// global selectors - use it in mapStateToProps, or in action creators (getState())
export default globalizeSelectors(localState, {
  getReadyState,
});
