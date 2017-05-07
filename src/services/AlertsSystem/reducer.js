import { combineReducers } from 'redux-immutable';
import R from 'ramda';
import conditionsReducer, * as fromConditionsReducer from './reducers/conditionsReducer';
import journalReducer, * as fromJournalReducer from './reducers/journalReducer';

export default combineReducers({
  conditions: conditionsReducer,
  journal: journalReducer,
});

const getConditionsSlice = state => state.getIn(['alerts', 'conditions']);
const getJournalSlice = state => state.getIn(['alerts', 'journal']);

export const getAlertConditions = state =>
  R.compose(fromConditionsReducer.getAlertConditions, getConditionsSlice)(state);

export const getAlertConditionByIdFunc = state =>
  R.compose(fromConditionsReducer.getAlertConditionByIdFunc, getConditionsSlice)(state);

export const getVehicleAlertConditions = state =>
  R.compose(fromConditionsReducer.getVehicleAlertConditions, getConditionsSlice)(state);

export const jrnIsOpened = state =>
  R.compose(fromJournalReducer.jrnIsOpened, getJournalSlice)(state);

export const jrnGetLastOpenedTS = state =>
  R.compose(fromJournalReducer.jrnGetLastOpenedTS, getJournalSlice)(state);

export const jrnGetLatestRecievedTS = state =>
  R.compose(fromJournalReducer.jrnGetLatestRecievedTS, getJournalSlice)(state);

export const jrnIsWating = state =>
  R.compose(fromJournalReducer.jrnIsWating, getJournalSlice)(state);

export const jrnNewCount = state =>
  R.compose(fromJournalReducer.jrnNewCount, getJournalSlice)(state);

export const jrnGetEntries = state =>
  R.compose(fromJournalReducer.jrnGetEntries, getJournalSlice)(state);
