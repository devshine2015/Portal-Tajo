import { createSelector } from 'reselect';
import { getEntriesNewestFirst } from './reducers/nextJournalReducer';

export default () => {
  return createSelector(getEntriesNewestFirst, (entries) => {
    return entries;
  });
};
