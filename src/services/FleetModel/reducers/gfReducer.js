import { List, fromJS } from 'immutable';
import { gfActions } from '../actions';

const gfsInitialState = fromJS({
  list: new List(),
  processedList: {},
  sortedList: new List(),
});

function gfReducer(state = gfsInitialState, action) {
  switch (action.type) {
    case gfActions.FLEET_MODEL_GF_SET:
      return state
              .set('list', new List(action.gfs))
              .set('processedList', fromJS(action.localGFs))
              .set('sortedList', new List(action.sortedGFs));

    case gfActions.FLEET_MODEL_GF_FILTER:
      return state.set('processedList', fromJS(action.gfs));
    default:
      return state;
  }
}

export default gfReducer;

export const getGFs = (state) =>
  state.get('list');

export const getGFsEx = (state) => {
  const theObj = getProcessedGFs(state);

  if (theObj.size === 0) {
    return [];
  }

  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);

  return aList;
};

export const getGFsExSorted = state => {
  const theObj = getProcessedGFs(state).toJS();
  const sortedList = state.get('sortedList');

  return sortedList.map(id => theObj[id]).toJS();
};

export const getProcessedGFs = (state) =>
  state.get('processedList');
