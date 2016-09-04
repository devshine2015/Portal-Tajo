// import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { CHRONICLE_SET_T } from './actions';

const chronicleInitialState = fromJS({
  normalized100T: 0,
});

export default function chronicleReducer(state = chronicleInitialState, action) {
  switch (action.type) {
    case CHRONICLE_SET_T:
      return state.set('normalized100T', action.normalized100T);
    default:
      return state;
  }
}

export const getNormalized100T = (state) =>
  state.getIn(['chronicle', 'normalized100T']);
