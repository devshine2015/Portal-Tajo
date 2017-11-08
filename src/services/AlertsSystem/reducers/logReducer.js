import { fromJS } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import { logActions } from '../actions';
import newestFirst from './helpers';

const initialState = fromJS({
  entries: [],
  period: {
    fromDate: undefined,
    toDate: undefined,
  },
});

export default function (state = initialState, action) {
  switch (action.type) {
    case logActions.LOGS_SET:
      return state.withMutations((st) => {
        st.set('entries', fromJS(action.entries))
          .set('period', action.period);
      });

    case logActions.LOGS_PERIOD_SET:
      return state.set('period', action.period);

    case SESSION_CLEAN:
      return initialState;

    default:
      return state;
  }
}

export const getLogEntriesNewestFirst = (state) => {
  return state.get('entries').sort(newestFirst);
};

export const getLogEntries = (state) => {
  return state.get('alerts').get('logs').get('entries');
};

export const getLogPeriod = (state) => {
  return state.get('period');
};
