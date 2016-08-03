
function makeLocalLocation(backEndObject) {
  if (backEndObject.status !== 'active') {
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

function MakeLocalLocations(backEndVehiclesList) {
  const theLocations = {};

  backEndVehiclesList.forEach((aLoc) => {
    const localLocObj = makeLocalLocation(aLoc);
    if (localLocObj !== null) {
      theLocations[aLoc.id] = localLocObj;
    }
  });

  return theLocations;
}

export default MakeLocalLocations;
