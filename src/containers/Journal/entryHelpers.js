// import { vehiclesActions } from 'services/FleetModel/actions';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';

let _devCounter = 0;
export function createJournalEntryDbg() {
  const eventDate = new Date();
  return {
    localTime: eventDate.toLocaleTimeString(),
    localDate: eventDate.toLocaleDateString(),
    eventKind: 'speeding-alert',
    eventName: `local test alert ${_devCounter++}`,
    ownerName: 'dummy',
    name: 'dummy event',
  };}

export function createJournalEntry(backEndAlertEvent, vehicles) {
  // const date = moment(this.props.entryObj.ev.ts).format('DD-MM-YYYY');
  // TODO: use only ev.ts - once engine fixed - this should always come from engine
  const eventDate = new Date(backEndAlertEvent.ev.ts !== undefined ?
    backEndAlertEvent.ev.ts
    : backEndAlertEvent.ev.crossTime !== undefined ?
      backEndAlertEvent.ev.crossTime : 0);
  const theVehicle = vehicles.length === 0 ? null : getVehicleById(backEndAlertEvent.ev.vehicleId, vehicles);
  return {
    localTime: eventDate.toLocaleTimeString(),
    localDate: eventDate.toLocaleDateString(),
    eventKind: backEndAlertEvent.ev.conditionKind,
    eventName: backEndAlertEvent.ev.meta.name,
    ownerName: theVehicle === null ? 'loading cars..' : theVehicle.vehicle.original.name,
    // ownerVehicle: getVehicleById(backEndAlertEvent.ev.vehicleId, vehicles),
    name: backEndAlertEvent.ev.meta.name,
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
