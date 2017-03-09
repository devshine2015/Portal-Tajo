// import { vehiclesActions } from 'services/FleetModel/actions';

export function createJournalEntryTxt(text) {
  const nowDate = new Date();
  return {
    localTime: nowDate.toLocaleTimeString(),
    localDate: nowDate.toLocaleDateString(),
    entryText: text,
  };
}

export function createJournalEntry(eventType, owner) {
  const nowDate = new Date();
  return {
    localTime: nowDate.toLocaleTimeString(),
    localDate: nowDate.toLocaleDateString(),
    eventType,
    owner,
  };
}

// export function _devFakeCreateLocalJournalEntry(eventType, owner) {
//   const nowDate = new Date();
//   return {
//     localTime: nowDate.toLocaleTimeString(),
//     localDate: nowDate.toLocaleDateString(),
//     eventType,
//     owner,
//   };
// }
