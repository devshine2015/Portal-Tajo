import { createSelector } from 'reselect';
import { jrnGetEntries } from 'services/AlertsSystem/reducers/journalReducer';

export default () => {
  return createSelector(jrnGetEntries, (entries) => {
    return entries;
  });
};
