
function makeLocalVehicle(backEndObject) {
  const theVehicle = {};
  theVehicle.name = backEndObject.name;
  theVehicle.id = backEndObject.id;
  // latlng
  const lt = 39.75 + Math.random() * 0.5;
  const ln = -74.70 + Math.random() * 0.5;
  theVehicle.pos = [lt, ln];
  theVehicle.speed = 0;
  // dist
  theVehicle.dist = { total: 0, lastTrip: 0 };
  //
  theVehicle.temp = undefined;
  //
  theVehicle.lastUpdateTS = new Date(0, 0, 0);
  return theVehicle;
}

function MakeLocalVehicles(backEndVehiclesList) {
  const theVechicles = {};

  backEndVehiclesList.forEach((aVehicle) => {
    const localVehicleObj = makeLocalVehicle(aVehicle);
    theVechicles[aVehicle.id] = localVehicleObj;
  });

  return theVechicles;
}

export default MakeLocalVehicles;
