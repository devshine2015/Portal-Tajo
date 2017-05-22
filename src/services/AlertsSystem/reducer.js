import { combineReducers } from 'redux-immutable';
import R from 'ramda';
import conditionsReducer, * as fromConditionsReducer from './reducers/conditionsReducer';
import journalReducer, * as fromJournalReducer from './reducers/journalReducer';
import logReducer /* , * as fromJournalReducer*/ from './reducers/logReducer';

export default combineReducers({
  conditions: conditionsReducer,
  journal: journalReducer,
  logs: logReducer,
});

const getConditionsSlice = state => state.getIn(['alerts', 'conditions']);
export const getJournalSlice = state => state.getIn(['alerts', 'journal']);
export const getLogsSlice = state => state.getIn(['alerts', 'logs']);

export const getAlertConditions = state =>
  R.compose(fromConditionsReducer.getAlertConditions, getConditionsSlice)(state);

export const getAlertConditionByIdFunc = state =>
  R.compose(fromConditionsReducer.getAlertConditionByIdFunc, getConditionsSlice)(state);

export const getVehicleAlertConditions = state =>
  R.compose(fromConditionsReducer.getVehicleAlertConditions, getConditionsSlice)(state);

export const getAlertConditionById = (state, id) =>
  fromConditionsReducer.getAlertConditionById(getConditionsSlice(state), id);

export const getEntries = state =>
  fromJournalReducer.getEntries(state);
