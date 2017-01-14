import { fromJS } from 'immutable';
import * as jrActions from './actions';

const initialState = fromJS({
  items: [],
  newItemsCount: 0,
  isOpened: false,
});

function journalReducer(state = initialState, action) {
  switch (action.type) {
    case jrActions.JR_OPEN:
      return state.set('isOpened', action.doOpen);
    // case logActions.LOG_ADD_ITEMS:
    //   return state.   ('logItems', action.logItems);
    default:
      return state;
  }
}

const _journalReducer = state =>
  state.getIn(['global', 'journal']);

export default journalReducer;

export const jrIsOpened = state =>
  _journalReducer(state).get('isOpened');
export const jrNewCount = state =>
  _journalReducer(state).get('newItemsCount');
