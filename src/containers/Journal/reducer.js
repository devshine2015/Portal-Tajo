import { fromJS } from 'immutable';
import * as jrnActions from './actions';

const _LOCAL_JOURNAL_SIZE_LIMIT_ = 300;

const initialState = fromJS({
//  entries is a JS array here
//  entries: null,
  newEntriesCount: 0,
  isOpened: false,
  lastRecievedTS: 0,
  lastOpenedTS: 0,
  isWaiting: false,
});

function journalReducer(state = initialState, action) {
  switch (action.type) {
    case jrnActions.JR_OPEN:
      if (!action.doOpen) {
        return state.set('lastOpenedTS', Date.now())
            .set('newEntriesCount', 0)
            .set('isOpened', action.doOpen);
      }
      return state.set('isOpened', action.doOpen);
    case jrnActions.JR_SET_WAITING:
      return state.set('isWaiting', true);
    case jrnActions.JR_ADD_ENTRIES: {
      // return state.set('entries', action.newEntriesList)
      const newCount = action.newEntriesList.length;
      let nextState = state.set('lastRecievedTS', action.latestRecievedTS)
                      .set('isWaiting', false);
      if (newCount > 0) {
        const aList = state.get('entries');
        const nextList = aList !== undefined ? aList.concat(action.newEntriesList) : action.newEntriesList;
        nextList.sort((a, b) => (b.eventTS - a.eventTS));
        nextList.length = Math.min(nextList.length, _LOCAL_JOURNAL_SIZE_LIMIT_);
        // newCount = Math.min(newCount, _LOCAL_JOURNAL_SIZE_LIMIT_);
        nextState = nextState.set('entries', nextList)
          .set('newEntriesCount', state.get('newEntriesCount') + newCount);
      }
      return nextState;

      // const newList = state.get('entries').push(...action.newEntriesList);
      // return state.set('entries', newList)
      //   .set('newEntriesCount', state.get('newEntriesCount') + action.newEntriesList.length);
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

export const jrnGetLastOpenedTS = state =>
  _journalReducer(state).get('lastOpenedTS');

export const jrnGetLatestRecievedTS = state =>
  _journalReducer(state).get('lastRecievedTS');

export const jrnIsWating = state =>
  _journalReducer(state).get('isWaiting');

export const jrnNewCount = state =>
  Math.min(_journalReducer(state).get('newEntriesCount'), _LOCAL_JOURNAL_SIZE_LIMIT_);
  // _journalReducer(state).get('newEntriesCount');
  // jrnGetEntries(state).length;

export const jrnGetEntries = (state) => {
  const theList = _journalReducer(state).get('entries');
  if (theList === undefined) {
    return [];
  }
  return theList;
};
