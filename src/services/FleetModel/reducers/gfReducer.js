import { Map, List, fromJS } from 'immutable';
import { gfActions } from '../actions';

const gfsInitialState = fromJS({
  list: new List(),
  processedList: {},
});

function gfReducer(state = gfsInitialState, action) {
  switch (action.type) {
    case gfActions.FLEET_MODEL_GF_SET:
      return state.set('list', new List(action.locations))
          .set('processedList', fromJS(action.localGFs));
    case gfActions.FLEET_MODEL_GF_FILTER:
      return state.set('processedList', new Map(action.gfs));
    default:
      return state;
  }
}

export default gfReducer;

export const getGFs = (state) =>
  state.get('list');

export const getGFsEx = (state) => {
  const theObj = state.get('processedList');
  if (theObj.size === 0) {
    return [];
  }
  const jsObj = theObj.toJS();
  const aList = Object.values(jsObj);
  return aList;
};

export const getProcessedGFs = (state) =>
  state.get('processedList');
