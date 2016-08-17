// incoming backEnd vehicle obj:
//
// "id": "0691e788-72ac-4529-9308-e7a087d15f77",
// "name": "Land Cruiser (#LC7)",
// "licensePlate": "YGN 5J - 8987",
// "make": "Toyota",
// "model": "Landcruiser",
// "year": "2000",
// "created": "2015-12-17T15:18:03.760+0000",
// "updated": "2016-07-13T12:16:09.547+0000",
// "deviceId": "863286020885894",
// "status": "active"


function makeLocalVehicle(backEndObject) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }
  const theVehicle = {};
  theVehicle.name = backEndObject.name;
  theVehicle.id = backEndObject.id;
  theVehicle.filteredOut = false;
  // ----
  theVehicle.licensePlate = backEndObject.licensePlate;
  theVehicle.make = backEndObject.make;
  theVehicle.model = backEndObject.model;
  theVehicle.year = backEndObject.year;
  // latlng
  const lt = 39.75 + Math.random() * 0.5;
  const ln = -74.70 + Math.random() * 0.5;
  theVehicle.pos = [lt, ln];
  theVehicle.speed = 0;
  // dist
  theVehicle.dist = { total: 0, lastTrip: 0 };
  //
  theVehicle.temp = undefined;
  // wrong format or date: 1899-12-30T17:00:00.000Z
  // theVehicle.lastUpdateTS = new Date(0, 0, 0);
  return theVehicle;
}

function MakeLocalVehicles(backEndVehiclesList) {
  const theVechicles = {};

  backEndVehiclesList.forEach((aVehicle) => {
    const localVehicleObj = makeLocalVehicle(aVehicle);
    if (localVehicleObj !== null) {
      theVechicles[aVehicle.id] = localVehicleObj;
    }
  });

  return theVechicles;
}

export default MakeLocalVehicles;
