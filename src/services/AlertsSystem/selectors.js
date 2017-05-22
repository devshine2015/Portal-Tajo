import { createSelector } from 'reselect';
import { getJournalEntriesNewestFirst } from './reducers/journalReducer';
import { getLogEntriesNewestFirst } from './reducers/logReducer';

export const getJournalEntries = () => {
  return createSelector(getJournalEntriesNewestFirst, (entries) => {
    return entries;
  });
};

export const getLogEntries = () => {
  return createSelector(getLogEntriesNewestFirst, (entries) => {
    return entries;
  });
};
