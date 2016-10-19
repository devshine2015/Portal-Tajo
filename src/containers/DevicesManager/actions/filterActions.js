export const DEVICES_MANAGER_FILTER = 'portal/DevicesManager/DEVICES_MANAGER_FILTER';

// type one of:
// all - display all devices
// not-attached - display those are not attached
// fault-vehicle - display those with fault vehicleId
export const filterBy = filterType => ({
  type: DEVICES_MANAGER_FILTER,
  filterType,
});
