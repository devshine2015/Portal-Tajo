import { List, Map, fromJS } from 'immutable';
import * as mwaActions from './actions';

const mwaInitialState = fromJS({
  jobs: {},
});

function mwaReducer(state = mwaInitialState, action) {
  switch (action.type) {
    case mwaActions.MWA_ADD_JOBS:
      return state.withMutations(s => {
        s.set('jobs', new Map(action.jobs));});
    default:
      return state;
  }
}

export default mwaReducer;

export const getMWAJobs = (state) => {
  const theObj = state.getIn(['mwa','jobs']);

  if (theObj.size === 0) {
    return [];
  }

  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);

  return aList;
};
