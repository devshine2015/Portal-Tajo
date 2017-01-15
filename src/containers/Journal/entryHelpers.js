// import { vehiclesActions } from 'services/FleetModel/actions';

export function createJournalEntry(text) {
  const nowDate = new Date();
  return {
    localTime: nowDate.toLocaleTimeString(),
    localDate: nowDate.toLocaleDateString(),
    entryText: text,
  };
}
