import { fromJS } from 'immutable';
import { journalActions } from '../actions';

const initialState = fromJS({
  entries: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case journalActions.JOURNAL_ENTRIES_ADD: {
      return state.update('entries', list => list.concat(fromJS(action.entries)));
    }
    default:
      return state;
  }
}

export const getEntries = state =>
  state.get('entries');

export const getJournalEntriesNewestFirst = (state) => {
  return getEntries(state).sort((a, b) => {
    return b.get('eventTS') - a.get('eventTS');
  });
};
