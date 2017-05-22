import { fromJS } from 'immutable';
import { logActions } from '../actions';
import newestFirst from './helpers';

const initialState = fromJS({
  entries: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case logActions.LOGS_ADD:
      return state.set('entries', fromJS(action.entries));

    default:
      return state;
  }
}

export const getLogEntriesNewestFirst = (state) => {
  return state.get('entries').sort(newestFirst);
};
