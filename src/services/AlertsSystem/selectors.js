import { createSelector } from 'reselect';
import { getEntries } from './reducers/journalReducer';
import {
  getLogEntriesNewestFirst,
  getLogPeriod,
} from './reducers/logReducer';
import { getIsConditionsReady } from './reducers/conditionsReducer';

export const getJournalEntries = () => {
  return createSelector(getEntries, (entries) => {
    return entries.sort((a, b) => {
      return b.get('eventTS') - a.get('eventTS');
    });
  });
};

export const selectLogEntries = createSelector(getLogEntriesNewestFirst, (entries) => {
  return entries;
});

export const selectLogPeriod = createSelector(getLogPeriod, period => period);

export const makeGetIsConditionsReady = () => {
  return createSelector(getIsConditionsReady, (isReady) => {
    return isReady;
  });
};
