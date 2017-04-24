import { List, Map, fromJS } from 'immutable';
import * as mwaActions from './actions';

const mwaInitialState = fromJS({
  jobs: {},
  selectedId: '',
});

function mwaReducer(state = mwaInitialState, action) {
  switch (action.type) {
    case mwaActions.MWA_ADD_JOBS:
      return state.set('jobs', fromJS(action.jobs));
      // return state.set('jobs', new Map(action.jobs));
      // return state.withMutations(s => {
      //   s.set('jobs', new Map(action.jobs));});
    case mwaActions.MWA_SELECT_JOB:
      return state.set('selectedId', action.id);
    default:
      return state;
  }
}

export default mwaReducer;

export const getMWAJobs = (state) => {
  const theObj = getMWAJobsAsIM(state);

  if (theObj.size === 0) {
    return [];
  }

  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);

  return aList;
};

export const getMWAJobsAsIM = (state) => state.getIn(['mwa', 'jobs']);

export const getMWASelectedJobId = state => state.getIn(['mwa', 'selectedId']);
