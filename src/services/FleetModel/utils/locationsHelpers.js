
function makeLocalLocation(backEndObject) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }

  const theLocation = {};
  theLocation.name = backEndObject.name;
  theLocation.id = backEndObject.id;
  // latlng
  theLocation.pos = [backEndObject.center.lat, backEndObject.center.lng];
  theLocation.radius = backEndObject.radius;
  return theLocation;
}

function MakeLocalLocations(backEndLocationsList) {
  const theLocations = {};
  backEndLocationsList
  // .sort((a, b) => {
  //   const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  //   const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // })
  .forEach((aLoc) => {
    const localLocObj = makeLocalLocation(aLoc);
    if (localLocObj !== null) {
      theLocations[aLoc.id] = localLocObj;
    }
  });
  return theLocations;
}

export default MakeLocalLocations;
