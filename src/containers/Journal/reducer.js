import { fromJS } from 'immutable';
import * as jrnActions from './actions';

const initialState = fromJS({
  entries: [],
  newEntriesCount: 0,
  isOpened: false,
});

function journalReducer(state = initialState, action) {
  switch (action.type) {
    case jrnActions.JR_OPEN:
      // if (!action.doOpen) {
      //   return state.set('isOpened', action.doOpen);
      // }
      // // reset new count when openeing(showing)
      // return state.set('isOpened', action.doOpen)
      //   .set('newEntriesCount', 0);
      return state.set('isOpened', action.doOpen);
    case jrnActions.JR_ADD_ENTRIES: {
      const newList = state.get('entries').push(...action.newEntriesList);
      return state.set('entries', newList)
        .set('newEntriesCount', state.get('newEntriesCount') + action.newEntriesList.length);
    }
    default:
      return state;
  }
}

const _journalReducer = state =>
  state.getIn(['global', 'journal']);

export default journalReducer;

export const jrnIsOpened = state =>
  _journalReducer(state).get('isOpened');
export const jrnNewCount = state =>
  _journalReducer(state).get('newEntriesCount');
export const jrnGetEntries = (state) => {
  const theList = _journalReducer(state).get('entries');
  return theList.toJS();
};
