import { createSelector } from 'reselect';
import { getJournalEntriesNewestFirst } from './reducers/journalReducer';
import { getLogEntriesNewestFirst } from './reducers/logReducer';
import { getIsConditionsReady } from './reducers/conditionsReducer';

export const getJournalEntries = () => {
  return createSelector(getJournalEntriesNewestFirst, (entries) => {
    return entries;
  });
};

export const selectLogEntries = createSelector(getLogEntriesNewestFirst, (entries) => {
  return entries;
});

export const makeGetIsConditionsReady = () => {
  return createSelector(getIsConditionsReady, (isReady) => {
    return isReady;
  });
};
