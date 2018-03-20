import { fromJS } from 'immutable';
import { SESSION_CLEAN } from 'services/Session/actions';
import { UPDATE_FLEET_FUEL_ALERTS } from 'services/FleetOverview/actions';
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

    case UPDATE_FLEET_FUEL_ALERTS:
      return state.set('entries', fromJS(action.alerts));

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
