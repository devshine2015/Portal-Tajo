
function makeLocalVehicle(backEndObject) {
  const theVehicle = {};
  theVehicle.name = backEndObject.name;
  theVehicle.id = backEndObject.id;
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
