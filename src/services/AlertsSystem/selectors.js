import { createSelector } from 'reselect';
import { getEntries } from './reducers/nextJournalReducer';

export default () => {
  return createSelector(getEntries, (entries) => {
    return entries;
  });
};
