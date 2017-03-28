// import { vehiclesActions } from 'services/FleetModel/actions';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';

export function createJournalEntryDbg(eventType, owner) {
  const nowDate = new Date();
  return {
    localTime: nowDate.toLocaleTimeString(),
    localDate: nowDate.toLocaleDateString(),
    eventType,
    owner,
  };
}

export function createJournalEntry(backEndAlertEvent, vehicles) {
  // const date = moment(this.props.entryObj.ev.ts).format('DD-MM-YYYY');
  const eventDate = new Date(backEndAlertEvent.ev.ts);
  const theVehicle = getVehicleById(backEndAlertEvent.ev.vehicleId, vehicles);
  const noVehiclesYet = vehicles.length === 0;
  return {
    localTime: eventDate.toLocaleTimeString(),
    localDate: eventDate.toLocaleDateString(),
    eventKind: backEndAlertEvent.ev.conditionKind,
    eventName: backEndAlertEvent.ev.meta.name,
    ownerName: noVehiclesYet ? 'loading cars..' : theVehicle.vehicle.original.name,
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
