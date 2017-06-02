// import { sortByName } from 'utils/sorting';

function _makeOneLocalDriver(srcDriverObject) {
  if (srcDriverObject.status !== 'active') {
    return null;
  }
  const theDriver = {};
  theDriver.name = `${srcDriverObject.details.firstName} ${srcDriverObject.details.lastName} `;
  theDriver.filteredOut = false;
  theDriver.id = srcDriverObject.id;

  theDriver.original = srcDriverObject;
  return theDriver;
}

export function makeLocalDrivers(srcDriversArray) {
  const localDrivers = {};
  srcDriversArray.forEach((drvr) => {
    const localDrvrObj = _makeOneLocalDriver(drvr);
    if (localDrvrObj !== null) {
      localDrivers[localDrvrObj.id] = localDrvrObj;
    }
  });
  return localDrivers;
}

