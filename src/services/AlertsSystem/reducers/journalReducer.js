import { fromJS } from 'immutable';
import { journalActions } from '../actions';

const _LOCAL_JOURNAL_SIZE_LIMIT_ = 300;

const initialState = fromJS({
  entries: [],
  newEntriesCount: 0,
  isOpened: false,
  lastRecievedTS: 0,
  lastOpenedTS: 0,
  isWaiting: false,
});

function journalReducer(state = initialState, action) {
  switch (action.type) {
    case journalActions.JR_OPEN:
      if (!action.doOpen) {
        return state.set('lastOpenedTS', Date.now())
            .set('newEntriesCount', 0)
            .set('isOpened', action.doOpen);
      }
      return state.set('isOpened', action.doOpen);
    case journalActions.JR_SET_WAITING:
      return state.set('isWaiting', true);
    case journalActions.JR_ADD_ENTRIES: {
      const newCount = action.newEntriesList.length;
      let nextState = state.set('lastRecievedTS', action.latestRecievedTS)
                      .set('isWaiting', false);
      if (newCount > 0) {
        const aList = state.get('entries');
        const nextList = aList !== undefined ? aList.concat(action.newEntriesList) : action.newEntriesList;
        nextList.sort((a, b) => (b.eventTS - a.eventTS));
        nextList.length = Math.min(nextList.length, _LOCAL_JOURNAL_SIZE_LIMIT_);
        nextState = nextState.set('entries', nextList)
          .set('newEntriesCount', state.get('newEntriesCount') + newCount);
      }
      return nextState;

    }
    default:
      return state;
  }
}

export default journalReducer;

export const jrnGetLatestRecievedTS = state =>
  state.get('lastRecievedTS');

export const jrnIsWaiting = state =>
  state.get('isWaiting');
